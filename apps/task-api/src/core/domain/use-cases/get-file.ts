import { File } from '../entities/file';
import { FileRepository } from '../../repositories/file.repository';
import { UploadFileInput } from '../interfaces/upload-file-input';

export class GetFile {
  private fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(filePath: string): Promise<File | null> {
    const file = await this.fileRepository.getItem(filePath);

    return file;
  }
}
