import { Module } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CourseRegistrationController } from './course-registration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseRegistration,
  CourseRegistrationSchema,
} from './schemas/course-registration.schema';
import { MailModule } from 'src/modules/mail/mail.module';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import { ReadingRoomModule } from '../reading-room/reading-room.module';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseRegistration.name, schema: CourseRegistrationSchema },
    ]),
    MailModule,
    AccountUserModule,
    ReadingRoomModule,
    AuthenticationModule,
  ],
  providers: [CourseRegistrationService],
  exports: [CourseRegistrationService],
  controllers: [CourseRegistrationController],
})
export class CourseRegistrationModule {}
