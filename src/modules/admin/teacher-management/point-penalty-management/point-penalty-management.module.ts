import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointPenaltyManagementController } from './point-penalty-management.controller';
import {
  PointPenaltyManagement,
  PointPenaltyManagementSchema,
} from 'src/schemas/admin/teacher-management/point-penalty-management.schema';
import { PointPenaltyManagementService } from './point-penalty-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PointPenaltyManagement.name,
        schema: PointPenaltyManagementSchema,
      },
    ]),
  ],
  providers: [PointPenaltyManagementService],
  controllers: [PointPenaltyManagementController],
  exports: [PointPenaltyManagementService],
})
export class PointPenaltyManagementModule {}
