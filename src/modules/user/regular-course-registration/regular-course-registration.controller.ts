import { Body, Controller, Post } from '@nestjs/common';
import { RegularCourseRegistrationService } from './regular-course-registration.service';
import { RegularCourseRegistrationDto } from './dto/regular-course-registration.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ReadingRoom } from '../reading-room/schemas/reading-room.schema';

@Controller('regular-course-registration')
export class RegularCourseRegistrationController {
  constructor(
    private readonly regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}

  @Post()
  async create(
    @Body() regularCreateUserDto: RegularCourseRegistrationDto,
  ): Promise<ResponseData<ReadingRoom>> {
    try {
      const data =
        await this.regularCourseRegistrationService.create(
          regularCreateUserDto,
        );
      return new ResponseData<ReadingRoom>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ReadingRoom>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
