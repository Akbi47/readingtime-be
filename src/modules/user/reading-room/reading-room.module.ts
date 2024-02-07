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
import {
  TrialProduct,
  TrialProductSchema,
} from 'src/modules/admin/product-management/free-trial-product/schemas/trial-product.schema';
import {
  RegularProduct,
  RegularProductSchema,
} from 'src/modules/admin/product-management/regular-product/schemas/regular-product.schema';
import { Curriculum, CurriculumSchema } from 'src/modules/admin/content-management/curriculum/schemas/curriculum.schema';

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
      {
        name: TrialProduct.name,
        schema: TrialProductSchema,
      },
      {
        name: RegularProduct.name,
        schema: RegularProductSchema,
      },
      {
        name: Curriculum.name,
        schema: CurriculumSchema,
      },
    ]),
  ],
  providers: [ReadingRoomService],
  exports: [ReadingRoomService],
  controllers: [ReadingRoomController],
})
export class ReadingRoomModule {}
