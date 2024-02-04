import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursService } from './working-hours.service';
import {
  WorkingHours,
  WorkingHoursSchema,
} from './schemas/working-hours.schema';
import { AccountTeacherModule } from '../account-teacher/account-teacher.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WorkingHours.name,
        schema: WorkingHoursSchema,
      },
    ]),
    AccountTeacherModule,
  ],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService],
  exports: [WorkingHoursService],
})
export class WorkingHoursModule {}
