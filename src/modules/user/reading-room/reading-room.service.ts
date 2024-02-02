import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  ReadingRoom,
  ReadingRoomDocument,
} from './schemas/reading-room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IdDto } from 'src/shares/dtos/param.dto';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';
import {
  AccountUser,
  AccountUserDocument,
} from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';
import {
  CourseRegistration,
  CourseRegistrationDocument,
} from '../course-registration/schemas/course-registration.schema';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationDocument,
} from '../regular-course-registration/schemas/regular-course-registration.schema';

@Injectable()
export class ReadingRoomService {
  constructor(
    @InjectModel(ReadingRoom.name)
    private readonly readingRoomModel: Model<ReadingRoomDocument>,
    @InjectModel(AccountTeacher.name)
    private readonly accountTeacherModel: Model<AccountTeacherDocument>,
    @InjectModel(AccountUser.name)
    private readonly accountUserModel: Model<AccountUserDocument>,
    @InjectModel(RegularCourseRegistration.name)
    private readonly regularCourseRegistrationModel: Model<RegularCourseRegistrationDocument>,
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
  ) {}
  populateReadingRoom = [
    {
      path: 'student_id',
      model: this.accountUserModel,
    },
    {
      path: 'teacher_id',
      model: this.accountTeacherModel,
    },
    {
      path: 'regular_course_registration_id',
      model: this.regularCourseRegistrationModel,
    },
    {
      path: 'course_registration_id',
      model: this.courseRegistrationModel,
    },
  ];
  async createData(data: any) {
    return await this.readingRoomModel.create(data);
  }
  async getReadingRoomOfUser(idDto: IdDto): Promise<ReadingRoom[]> {
    const { id } = idDto;
    return await this.readingRoomModel.findOne({ student_id: id });
  }
  async getReadingRoom(): Promise<ReadingRoom[]> {
    const data = await this.readingRoomModel
      .find()
      .populate(this.populateReadingRoom);
    console.log(data);

    return data;
  }

  async findByIdAndUpdateReadingRoom(
    id: string,
    data: any,
    trialCourse?: boolean,
  ): Promise<void> {
    await this.readingRoomModel.findOneAndUpdate(
      { student_id: id },
      trialCourse
        ? { course_registration_id: new mongoose.Types.ObjectId(data) }
        : { regular_course_registration_id: new mongoose.Types.ObjectId(data) },
      {
        new: true,
      },
    );
  }
}
