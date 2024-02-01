import { Body, Controller, Post } from '@nestjs/common';
import { RegularCourseRegistrationService } from './regular-course-registration.service';
import { RegularCourseRegistrationDto } from './dto/regular-course-registration.dto';

@Controller('regular-course-registration')
export class RegularCourseRegistrationController {
  constructor(
    private readonly regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}
  @Post()
  async create(@Body() regularCreateUserDto: RegularCourseRegistrationDto) {
    return await this.regularCourseRegistrationService.create(
      regularCreateUserDto,
    );
  }
}
