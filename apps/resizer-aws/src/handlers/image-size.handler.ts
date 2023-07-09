import createImageSizeStream from 'image-size-stream';

export class ImageSizeHandler {
  sizeStream: any;
  width: string;
  height: string;

  constructor() {
    this.sizeStream = createImageSizeStream();
    this.sizeStream.on('size', (dimensions: any) => {
      this.width = dimensions.width.toString();
      this.height = dimensions.height.toString();
    });
  }
}
