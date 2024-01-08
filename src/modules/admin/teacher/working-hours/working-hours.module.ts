import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursSchema } from '../../../../schemas/admin/teacher-management/working-hours.schema';
import { WorkingHoursService } from './working-hours.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'WorkingHours',
        schema: WorkingHoursSchema,
      },
    ]),
  ],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService],
})
export class WorkingHoursModule {}
