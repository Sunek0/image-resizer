import { Inject, Service } from 'typedi';
import { IFileService } from '../../services/file.service';

@Service()
export class CreateFolder {
  constructor(@Inject('FileService') private fileService: IFileService) {}

  async execute(filePath: string, recursive: boolean = false): Promise<void> {
    await this.fileService.createFolder(filePath, recursive);
  }
}
