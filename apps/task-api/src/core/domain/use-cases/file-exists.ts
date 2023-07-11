import { Inject, Service } from 'typedi';
import { IFileService } from '../../services/file.service';

@Service()
export class FileExists {
  constructor(@Inject('FileService') private fileService: IFileService) {}

  async execute(filePath: string): Promise<boolean> {
    const file = await this.fileService.fileExists(filePath);

    return file;
  }
}
