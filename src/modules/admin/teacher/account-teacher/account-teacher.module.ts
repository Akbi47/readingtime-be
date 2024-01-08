import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountTeacherController } from './account-teacher.controller';
import { AccountTeacherSchema } from '../../../../schemas/admin/teacher-management/account-teacher.schema';
import { AccountTeacherService } from './account-teacher.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccountTeacher', schema: AccountTeacherSchema },
    ]),
  ],
  controllers: [AccountTeacherController],
  providers: [AccountTeacherService],
})
export class AccountTeacherModule {}
