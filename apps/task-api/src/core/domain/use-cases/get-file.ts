import { File } from '../entities/file';
import { IFileRepository } from '../../repositories/file.repository';

export class GetFile {
  private fileRepository: IFileRepository;

  constructor(fileRepository: IFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(filePath: string): Promise<File | null> {
    const file = await this.fileRepository.getItem(filePath);

    return file;
  }
}
