import sharp from 'sharp';

export class ImageResizerHandler {
  resizerStream: any;

  constructor(size: number) {
    this.resizerStream = sharp()
    .resize(size)
    .jpeg({ mozjpeg: true })
  }
}
