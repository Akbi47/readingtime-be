import { Module } from '@nestjs/common';
import { RegularAssignmentService } from './regular-assignment.service';
import { RegularAssignmentController } from './regular-assignment.controller';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';
import { WorkingHoursModule } from 'src/modules/admin/teacher-management/working-hours/working-hours.module';

@Module({
  imports: [ReadingRoomModule, AccountUserModule, WorkingHoursModule],
  providers: [RegularAssignmentService],
  exports: [RegularAssignmentService],
  controllers: [RegularAssignmentController],
})
export class RegularAssignmentModule {}
