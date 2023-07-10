export class ImageInfo {
  format: string;
  width: number;
  height: number;

  constructor(format: string, width: number, height: number) {
    this.format = format;
    this.width = width;
    this.height = height;
  }
}
