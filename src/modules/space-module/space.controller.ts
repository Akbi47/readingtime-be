import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFile } from './config';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: UploadedMulterFile) {
    const url = await this.spaceService.uploadFile(file);
    return {
      url,
    };
  }
}
