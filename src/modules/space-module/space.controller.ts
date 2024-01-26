import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.spaceService.uploadFile(file.originalname, file.buffer);
  }
}
