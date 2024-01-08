import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointPenaltyManagementController } from './point-penalty-management.controller';
import { PointPenaltyManagementSchema } from '../../../../schemas/admin/teacher-management/point-penalty-management.schema';
import { PointPenaltyManagementService } from './point-penalty-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'PointPenaltyManagement',
        schema: PointPenaltyManagementSchema,
      },
    ]),
  ],
  controllers: [PointPenaltyManagementController],
  providers: [PointPenaltyManagementService],
})
export class PointPenaltyManagementModule {}
