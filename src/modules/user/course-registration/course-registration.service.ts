import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CourseRegistration,
  CourseRegistrationDocument,
} from './schemas/course-registration.schema';
import { CourseRegistrationDto } from './dto/course-registration.dto';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class CourseRegistrationService {
  constructor(
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
    private readonly mailService: MailService,
  ) {}
  async create(data: CourseRegistrationDto): Promise<CourseRegistration> {
    const res = await this.courseRegistrationModel.create(data);
    await Promise.all([
      await this.mailService.sendMailToUser(data),
      await this.mailService.sendMailToAdmin(data),
    ]);
    return res;
  }
}
