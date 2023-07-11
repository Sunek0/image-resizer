import { Inject, Service } from 'typedi';
import { File } from '../entities/file';
import { IFileRepository } from '../../repositories/file.repository';

@Service()
export class GetFile {
  constructor(@Inject('FileRepository') private fileRepository: IFileRepository) {}

  async execute(filePath: string): Promise<File | null> {
    const file = await this.fileRepository.getItem(filePath);

    return file;
  }
}
