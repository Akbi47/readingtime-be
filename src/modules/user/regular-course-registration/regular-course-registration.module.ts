import { Module } from '@nestjs/common';
import { RegularCourseRegistrationService } from './regular-course-registration.service';
import { RegularCourseRegistrationController } from './regular-course-registration.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from 'src/modules/mail/mail.module';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationSchema,
} from './schemas/regular-course-registration.schema';
import { ReadingRoomModule } from '../reading-room/reading-room.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RegularCourseRegistration.name,
        schema: RegularCourseRegistrationSchema,
      },
    ]),
    MailModule,
    AccountUserModule,
    ReadingRoomModule,
  ],
  providers: [RegularCourseRegistrationService],
  exports: [RegularCourseRegistrationService],
  controllers: [RegularCourseRegistrationController],
})
export class RegularCourseRegistrationModule {}
