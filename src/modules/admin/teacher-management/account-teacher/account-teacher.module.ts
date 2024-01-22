import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountTeacherController } from './account-teacher.controller';
import { AccountTeacherSchema } from '../../../../schemas/admin/teacher-management/account-teacher.schema';
import { AccountTeacherService } from './account-teacher.service';
import { AccountTeacher } from './schemas/account-teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountTeacher.name, schema: AccountTeacherSchema },
    ]),
  ],
  controllers: [AccountTeacherController],
  providers: [AccountTeacherService],
})
export class AccountTeacherModule {}
