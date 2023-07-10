import { ImageResize } from "../../src/core/domain/entities/image-resize";
import { LambdaInteractor } from "../../src/core/interactors/lambda.interactor";

export class DummyLambdaInteractor implements LambdaInteractor {
  resizeImage(imageId: string): Promise<ImageResize> {
    return Promise.resolve(new ImageResize('ok', '1234', '5678', '9012'));
  }
}
