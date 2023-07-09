import { parse } from 'path';
import express from 'express';
import serverless from 'serverless-http';
import crypto from 'crypto';
import { GetItemCommandInput, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { GetObjectCommandInput, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { DynamoDbHandler } from '../handlers/dynamodb.handler';
import { HashingHandler } from '../handlers/hashing.handler';
import { ImageSizeHandler } from '../handlers/image-size.handler';
import { ImageResizerHandler } from '../handlers/image-resizer.handler';
import { S3Handler } from '../handlers/s3.handler';

const bucket = process.env.BUCKET || 'dbarreiro.dynamic-image-resizing';
const region = process.env.REGION || 'eu-west-1';
const dynamoDbHandler = new DynamoDbHandler(region);
const s3Handler = new S3Handler(region);

const app = express();

app.use(express.json());

app.post("/resize", async function (req: express.Request, res: express.Response) {
  try {
    const { imageId } = req.body;
    // Get image info from DynamoDB
    const getImagePathParams: GetItemCommandInput = {
      AttributesToGet: [
        "path"
      ],
      TableName: 'images',
      Key: {
        "id": { "S": imageId }
      },
    }
    const getImageInfo = await dynamoDbHandler.getItem(getImagePathParams)

    // Get image stream from S3
    const s3FilePath = getImageInfo.Item.path.S;
    const parsedS3FilePath = parse(s3FilePath)

    const getImageStreamParams: GetObjectCommandInput = {
      Bucket: bucket,
      Key: s3FilePath
    }
    const getImageStream = await s3Handler.getItem(getImageStreamParams);

    // Resize image to 1000 and 800 width
    const streamResizeBig = new ImageResizerHandler(1000);
    const streamResizeLittle = new ImageResizerHandler(800);

    getImageStream.Body.pipe(streamResizeBig.resizerStream);
    getImageStream.Body.pipe(streamResizeLittle.resizerStream);

    const [imageBig, imageLittle] = await Promise.all([streamResizeBig.resizerStream, streamResizeLittle.resizerStream])

    const imageBigPath = `${parsedS3FilePath.name}-1000.jpg`;
    const imageLittlePath = `${parsedS3FilePath.name}-800.jpg`;

    // Get big image checksum from stream
    const hashImageBig = new HashingHandler();
    imageBig.pipe(hashImageBig.hashingStream);

    // Get big image size from stream
    const imageBigSizeHandler = new ImageSizeHandler()
    imageBig.pipe(imageBigSizeHandler.sizeStream)

    // Get little image checksum from stream
    const hashImageLittle = new HashingHandler();
    imageLittle.pipe(hashImageLittle.hashingStream);

    // Get little image size from stream
    const imageLittleSizeHandler = new ImageSizeHandler()
    imageLittle.pipe(imageLittleSizeHandler.sizeStream)

    // Upload big image resized
    const uploadImageBigParams: PutObjectCommandInput = {
      Bucket: bucket,
      Key: imageBigPath,
      Body: imageBig
    }
    const uploadImageBig = s3Handler.putItem(uploadImageBigParams)
      .then(async () => {
        hashImageBig.hashingStream.end();
        const checksum = hashImageBig.hashingStream.read();

        // Put big resized image info to DynamoDB
        const imageBigId = crypto.randomUUID()
        var params: PutItemCommandInput = {
          TableName: 'images',
          Item: {
            'id': { S: imageBigId },
            'parentId': { S: imageId },
            'path': { S: imageBigPath },
            'width': { N: imageBigSizeHandler.width },
            'height': { N: imageBigSizeHandler.height },
            'checksum': { S: checksum },
            'createdAt': { N: new Date().getTime().toString() },
          }
        };

        await dynamoDbHandler.putItem(params)
        return imageBigId;
      });

    // Upload little image resized
    const uploadLittleImageParams: PutObjectCommandInput = {
      Bucket: bucket,
      Key: imageLittlePath,
      Body: imageLittle
    }
    const uploadImageLittle = s3Handler.putItem(uploadLittleImageParams)
      .then(async () => {
        hashImageLittle.hashingStream.end();
        const checksum = hashImageLittle.hashingStream.read();

        // Put little resized image info to DynamoDB
        const imageLittleId = crypto.randomUUID()
        var params = {
          TableName: 'images',
          Item: {
            'id': { S: imageLittleId },
            'parentId': { S: imageId },
            'path': { S: imageLittlePath },
            'width': { N: imageLittleSizeHandler.width },
            'height': { N: imageLittleSizeHandler.height },
            'checksum': { S: checksum },
            'createdAt': { N: new Date().getTime().toString() },
          }
        };

        await dynamoDbHandler.putItem(params);

        return imageLittleId;
      });

    const [imageBigId, imageLittleId] = await Promise.all([uploadImageBig, uploadImageLittle]);

    // Response request
    res.status(201).json({
      status: 'completed',
      imageId,
      imageBigId,
      imageLittleId
    })
  }
  catch (err) {
    res.status(500).json({
      status: 'error',
      error: err
    })
  }
});

module.exports.handler = serverless(app);
