import { Module } from '@nestjs/common';
import { FreeTrialAssignmentController } from './free-trial.controller';
import { FreeTrialAssignmentService } from './free-trial.service';

@Module({
  imports: [],
  controllers: [FreeTrialAssignmentController],
  providers: [FreeTrialAssignmentService],
})
export class FreeTrialAssignmentModule {}
