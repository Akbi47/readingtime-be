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
  constructor(private readonly spaceService: SpaceService) {
    // @UploadedFile() file: UploadedMulterFile
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile() {
    const url = await this.spaceService.uploadFile();
    return {
      url,
    };
  }
}
