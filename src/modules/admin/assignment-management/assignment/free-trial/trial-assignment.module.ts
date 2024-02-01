import { Module } from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';
import { TrialAssignmentController } from './trial-assignment.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';

import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';

@Module({
  imports: [ReadingRoomModule, AccountUserModule],
  providers: [TrialAssignmentService],
  exports: [TrialAssignmentService],
  controllers: [TrialAssignmentController],
})
export class TrialAssignmentModule {}
