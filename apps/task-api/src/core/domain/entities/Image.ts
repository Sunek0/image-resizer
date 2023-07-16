import { v4 as uuidv4 } from 'uuid';

export class Image {
    id: string;
    path: string;
    checksum: string;
    width: number;
    height: number;
    parentId: string;

    constructor (path: string, checksum: string, width: number, height: number, parentId: string = '') {
        this.id = uuidv4();
        this.path = path;
        this.checksum = checksum;
        this.width = width;
        this.height = height;
        this.parentId = parentId;
    }
}
