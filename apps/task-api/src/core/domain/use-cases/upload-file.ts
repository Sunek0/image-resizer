import { File } from '../entities/file';
import { IFileRepository } from '../../repositories/file.repository';
import { IUploadFileInput } from '../interfaces/upload-file-input';

export class UploadFile {
  private fileRepository: IFileRepository;

  constructor(fileRepository: IFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(input: IUploadFileInput): Promise<File> {
    const { filename, data } = input;
    const file = new File(filename, data);

    await this.fileRepository.putItem(file);

    return file;
  }
}
