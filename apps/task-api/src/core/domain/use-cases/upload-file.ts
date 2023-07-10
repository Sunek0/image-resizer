import { File } from '../entities/file';
import { FileRepository } from '../../repositories/file.repository';
import { UploadFileInput } from '../interfaces/upload-file-input';

export class UploadFile {
  private fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(input: UploadFileInput): Promise<File> {
    const { filename, data } = input;
    const file = new File(filename, data);

    await this.fileRepository.putItem(file);

    return file;
  }
}
