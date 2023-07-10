import { v4 as uuidv4 } from 'uuid';

export class File {
  filename: string;
  data: any;

  constructor(filename: string, data: any) {
    this.filename = filename;
    this.data = data;
  }
}
