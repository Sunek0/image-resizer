import { File } from '../entities/file';
import { IFileRepository } from '../../repositories/file.repository';
import { IUploadFileInput } from '../interfaces/upload-file-input';
import { Inject, Service } from 'typedi';

@Service()
export class UploadFile {
  constructor(@Inject('FileRepository') private fileRepository: IFileRepository) {}

  async execute(input: IUploadFileInput): Promise<File> {
    const { filename, data } = input;
    const file = new File(filename, data);

    await this.fileRepository.putItem(file);

    return file;
  }
}
