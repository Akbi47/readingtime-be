import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursService } from './working-hours.service';
import {
  WorkingHours,
  WorkingHoursSchema,
} from './schemas/working-hours.schema';
import { AccountTeacherModule } from '../account-teacher/account-teacher.module';
import {
  AccountTeacher,
  AccountTeacherSchema,
} from '../account-teacher/schemas/account-teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WorkingHours.name,
        schema: WorkingHoursSchema,
      },
      {
        name: AccountTeacher.name,
        schema: AccountTeacherSchema,
      },
    ]),
    AccountTeacherModule,
  ],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService],
  exports: [WorkingHoursService],
})
export class WorkingHoursModule {}
