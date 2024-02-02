import { Body, Controller, Post } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CourseRegistrationDto } from './dto/course-registration.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CourseRegistration } from './schemas/course-registration.schema';

@Controller('course-registration')
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Post()
  async create(
    @Body() courseRegistrationDto: CourseRegistrationDto,
  ): Promise<ResponseData<CourseRegistration>> {
    try {
      const data = await this.courseRegistrationService.create(
        courseRegistrationDto,
      );
      return new ResponseData<CourseRegistration>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseRegistration>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
