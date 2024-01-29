import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountTeacherController } from './account-teacher.controller';
import { AccountTeacherService } from './account-teacher.service';
import {
  AccountTeacher,
  AccountTeacherSchema,
} from './schemas/account-teacher.schema';

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
