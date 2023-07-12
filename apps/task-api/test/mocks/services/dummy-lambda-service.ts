import { ImageResize } from "../../../src/core/domain/entities/image-resize";
import { ILambdaService } from "../../../src/core/services/lambda.service";

export class DummyLambdaService implements ILambdaService {
  resizeImage(imageId: string): Promise<ImageResize> {
    return Promise.resolve(new ImageResize('ok', '1234', '5678', '9012'));
  }
}
