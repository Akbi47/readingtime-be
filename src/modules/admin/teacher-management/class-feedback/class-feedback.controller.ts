import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

import { ClassFeedbackService } from './class-feedback.service';
import { ClassFeedback } from './schemas/class-feedback.schema';
import { CreateClassFeedbackDto } from './dto/create-class-feedback.schema';

@Controller('class-feedback')
export class ClassFeedbackController {
  constructor(private readonly classFeedbackService: ClassFeedbackService) {}

  @Get()
  async getClassFeedback(): Promise<ResponseData<ClassFeedback[]>> {
    try {
      const data = await this.classFeedbackService.getClassFeedback();
      return new ResponseData<ClassFeedback[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ClassFeedback[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createClassFeedback(
    @Body() classFeedbackDto: CreateClassFeedbackDto,
  ): Promise<ResponseData<ClassFeedback>> {
    try {
      const data =
        await this.classFeedbackService.createClassFeedback(classFeedbackDto);
      return new ResponseData<ClassFeedback>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ClassFeedback>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
