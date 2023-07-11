export class Lambda {
    status: string;
    imageId: string;
    imageBigId: string;
    imageLittleId: string;

    constructor (status: string, imageId: string, imageBigId: string, imageLittleId: string) {
        this.status = status;
        this.imageId = imageId;
        this.imageBigId = imageBigId;
        this.imageLittleId = imageLittleId;
    }
}
