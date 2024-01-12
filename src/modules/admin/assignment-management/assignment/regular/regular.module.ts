import { Module } from '@nestjs/common';
import { RegularAssignmentController } from './regular.controller';
import { RegularAssignmentService } from './regular.service';

@Module({
  imports: [],
  controllers: [RegularAssignmentController],
  providers: [RegularAssignmentService],
})
export class RegularAssignmentModule {}
