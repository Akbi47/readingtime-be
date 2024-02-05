import { Module } from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';
import { TrialAssignmentController } from './trial-assignment.controller';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';
import { WorkingHoursModule } from 'src/modules/admin/teacher-management/working-hours/working-hours.module';


@Module({
  imports: [
    // forwardRef(() =>
    //   MongooseModule.forFeature([
    //     {
    //       name: AccountTeacher.name,
    //       schema: AccountTeacherSchema,
    //     },
    //   ]),
    // ),
    ReadingRoomModule,
    AccountUserModule,
    WorkingHoursModule,
  ],
  providers: [TrialAssignmentService],
  exports: [TrialAssignmentService],
  controllers: [TrialAssignmentController],
})
export class TrialAssignmentModule {}
