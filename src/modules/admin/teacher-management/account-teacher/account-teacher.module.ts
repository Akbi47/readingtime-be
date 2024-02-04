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
import { TeamManagementModule } from '../../team-management/team-management.module';
import {
  TeamManagement,
  TeamManagementSchema,
} from '../../team-management/schemas/team-management.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountTeacher.name, schema: AccountTeacherSchema },
      { name: WorkingHours.name, schema: WorkingHoursSchema },
      { name: TeamManagement.name, schema: TeamManagementSchema },
    ]),
    AccountUserModule,
    MailModule,
    TeamManagementModule,
  ],
  controllers: [AccountTeacherController],
  providers: [AccountTeacherService],
  exports: [AccountTeacherService],
})
export class AccountTeacherModule {}
