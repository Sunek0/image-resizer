const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET;
const region = process.env.AWS_REGION;
const resizePath = process.env.LAMBDA_RESIZE_PATH;

export default {
  resizePath,
  region,
  accessKeyId,
  secretAccessKey
};
