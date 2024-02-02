import { Module } from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';
import { TrialAssignmentController } from './trial-assignment.controller';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';
import { CourseRegistrationModule } from 'src/modules/user/course-registration/course-registration.module';
import { FreeTrialProductModule } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.module';

@Module({
  imports: [
    ReadingRoomModule,
    AccountUserModule,
    CourseRegistrationModule,
    FreeTrialProductModule,
  ],
  providers: [TrialAssignmentService],
  exports: [TrialAssignmentService],
  controllers: [TrialAssignmentController],
})
export class TrialAssignmentModule {}
