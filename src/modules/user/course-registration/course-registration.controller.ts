import { Body, Controller, Post } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CourseRegistrationDto } from './dto/course-registration.dto';

@Controller('course-registration')
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}
  @Post()
  async create(@Body() courseRegistrationDto: CourseRegistrationDto) {
    return await this.courseRegistrationService.create(courseRegistrationDto);
  }
}
