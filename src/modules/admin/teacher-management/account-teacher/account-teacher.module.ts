import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountTeacherController } from './account-teacher.controller';
import { AccountTeacherService } from './account-teacher.service';
import {
  AccountTeacher,
  AccountTeacherSchema,
} from './schemas/account-teacher.schema';
import { AccountUserModule } from '../../user-management/account-user/account-user.module';
import { MailModule } from 'src/modules/mail/mail.module';
import {
  WorkingHours,
  WorkingHoursSchema,
} from '../working-hours/schemas/working-hours.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountTeacher.name, schema: AccountTeacherSchema },
      { name: WorkingHours.name, schema: WorkingHoursSchema },
    ]),
    AccountUserModule,
    MailModule,
  ],
  controllers: [AccountTeacherController],
  providers: [AccountTeacherService],
})
export class AccountTeacherModule {}
