import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointPenaltyManagementController } from './point-penalty-management.controller';

import { PointPenaltyManagementService } from './point-penalty-management.service';
import {
  PointPenaltyManagement,
  PointPenaltyManagementSchema,
} from './schemas/point-penalty-management.schema';

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
