import { Module } from '@nestjs/common';
import { ReadingRoomService } from './reading-room.service';
import { ReadingRoomController } from './reading-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingRoom, ReadingRoomSchema } from './schemas/reading-room.schema';
import {
  AccountTeacher,
  AccountTeacherSchema,
} from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';
import {
  AccountUser,
  AccountUserSchema,
} from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';
import {
  CourseRegistration,
  CourseRegistrationSchema,
} from 'src/modules/user/course-registration/schemas/course-registration.schema';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationSchema,
} from 'src/modules/user/regular-course-registration/schemas/regular-course-registration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadingRoom.name, schema: ReadingRoomSchema },
      { name: AccountUser.name, schema: AccountUserSchema },
      { name: AccountTeacher.name, schema: AccountTeacherSchema },
      { name: CourseRegistration.name, schema: CourseRegistrationSchema },
      {
        name: RegularCourseRegistration.name,
        schema: RegularCourseRegistrationSchema,
      },
    ]),
  ],
  providers: [ReadingRoomService],
  exports: [ReadingRoomService],
  controllers: [ReadingRoomController],
})
export class ReadingRoomModule {}
