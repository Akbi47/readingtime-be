import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursService } from './working-hours.service';
import {
  WorkingHours,
  WorkingHoursSchema,
} from './schemas/working-hours.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WorkingHours.name,
        schema: WorkingHoursSchema,
      },
    ]),
  ],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService],
})
export class WorkingHoursModule {}
