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
import * as moment from 'moment-timezone';
import {
  TrialProduct,
  TrialProductDocument,
} from 'src/modules/admin/product-management/free-trial-product/schemas/trial-product.schema';
import {
  RegularProduct,
  RegularProductDocument,
} from 'src/modules/admin/product-management/regular-product/schemas/regular-product.schema';
import {
  Curriculum,
  CurriculumDocument,
} from 'src/modules/admin/content-management/curriculum/schemas/curriculum.schema';
import { DashboardMonthlyDto } from 'src/modules/admin/assignment-management/dashboard/dashboard-monthly/dto/dashboard-monthly.dto';
import { DashboardDateDto } from 'src/modules/admin/assignment-management/dashboard/dashboard-today/dto/dashboard-date.dto';
moment.tz.setDefault('Asia/Seoul');

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
    @InjectModel(TrialProduct.name)
    private readonly trialProductModel: Model<TrialProductDocument>,
    @InjectModel(RegularProduct.name)
    private readonly regularProductModel: Model<RegularProductDocument>,
    @InjectModel(Curriculum.name)
    private readonly curriculumModel: Model<CurriculumDocument>,
  ) {}
  today = moment();
  date = this.today.date().toString();
  month = (this.today.month() + 1).toString();
  year = this.today.year().toString();
  populateTrialReadingRoom = [
    {
      path: 'student_id',
      model: this.accountUserModel,
    },
    {
      path: 'teacher_id',
      model: this.accountTeacherModel,
    },
    {
      path: 'course_registration_id',
      model: this.courseRegistrationModel,
      populate: [
        {
          path: 'trial_product_id',
          model: this.trialProductModel,
          populate: [
            {
              path: 'curriculum',
              model: this.curriculumModel,
            },
          ],
        },
      ],
    },
  ];
  populateRegularReadingRoom = [
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
      populate: [
        {
          path: 'regular_product_id',
          model: this.regularProductModel,
          populate: [
            {
              path: 'curriculum',
              model: this.curriculumModel,
            },
          ],
        },
      ],
    },
  ];
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
      populate: [
        {
          path: 'regular_product_id',
          model: this.regularProductModel,
          populate: [
            {
              path: 'curriculum',
              model: this.curriculumModel,
            },
          ],
        },
      ],
    },
    {
      path: 'course_registration_id',
      model: this.courseRegistrationModel,
      populate: [
        {
          path: 'trial_product_id',
          model: this.trialProductModel,
          populate: [
            {
              path: 'curriculum',
              model: this.curriculumModel,
            },
          ],
        },
      ],
    },
  ];

  async createData(data: any) {
    return await this.readingRoomModel.create(data);
  }
  async getReadingRoomOfUser(idDto: IdDto): Promise<ReadingRoom[]> {
    const { id } = idDto;
    return await this.readingRoomModel.findOne({ student_id: id });
  }
  async getReadingRoomById(
    idDto: IdDto | string,
    teacher_id?: IdDto,
  ): Promise<ReadingRoomDocument> {
    if (typeof idDto === 'object') {
      const { id } = idDto;
      return await this.readingRoomModel.findOne({
        _id: id,
        ...(teacher_id
          ? { teacher_id: new mongoose.Types.ObjectId(teacher_id.id) }
          : ''),
      });
    } else {
      const id = idDto;
      return await this.readingRoomModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        ...(teacher_id
          ? { teacher_id: new mongoose.Types.ObjectId(teacher_id.id) }
          : ''),
      });
    }
  }
  async getReadingRoomByTeacherId(
    teacher_id?: IdDto,
  ): Promise<ReadingRoomDocument> {
    return await this.readingRoomModel.findOne({
      teacher_id: new mongoose.Types.ObjectId(teacher_id.id),
    });
  }

  async getReadingRoom(
    trialClass?: true | false | null,
  ): Promise<ReadingRoom[]> {
    if (trialClass !== null) {
      const data = await this.readingRoomModel
        .find(
          trialClass
            ? { course_registration_id: { $exists: true } }
            : { regular_course_registration_id: { $exists: true } },
        )
        .populate(
          trialClass === true
            ? this.populateTrialReadingRoom
            : this.populateRegularReadingRoom,
        );

      return data;
    } else if (trialClass === null) {
      const data = await this.readingRoomModel
        .find()
        .populate(this.populateReadingRoom);

      return data;
    }
  }
  async getOneReadingRoomByDay(
    trialClass?: true | false | null,
    teacher_id?: IdDto,
    date?: DashboardDateDto,
  ): Promise<any[]> {
    if (trialClass !== null) {
      const data = await this.readingRoomModel
        .find(
          trialClass
            ? { course_registration_id: { $exists: true } }
            : { regular_course_registration_id: { $exists: true } },
        )
        .populate(
          trialClass === true
            ? this.populateTrialReadingRoom
            : this.populateRegularReadingRoom,
        );

      return data;
    } else if (trialClass === null) {
      const data = await this.readingRoomModel
        .findOne({
          teacher_id: teacher_id.id,
          timeline_events: {
            $elemMatch: {
              date: date ? date.day : this.date,
              month: date ? date.month : this.month,
              year: date ? date.year : this.year,
            },
          },
        })
        .populate(this.populateReadingRoom);
      if (data) {
        let index = data.timeline_events.findIndex((item) =>
          date
            ? item.date === date.day &&
              item.month === date.month &&
              item.year === date.year
            : item.date === this.date &&
              item.month === this.month &&
              item.year === this.year,
        );
        if (index !== -1) {
          index = index !== -1 ? index : null;
          return [data, { index: index }];
        }
      }
    }
    return [];
  }
  async getReadingRoomByDay(
    trialClass?: true | false | null,
    teacher_id?: IdDto,
    date?: DashboardDateDto,
  ): Promise<any[]> {
    if (trialClass !== null) {
      const data = await this.readingRoomModel
        .find(
          trialClass
            ? { course_registration_id: { $exists: true } }
            : { regular_course_registration_id: { $exists: true } },
        )
        .populate(
          trialClass === true
            ? this.populateTrialReadingRoom
            : this.populateRegularReadingRoom,
        );

      return data;
    } else if (trialClass === null) {
      const data = await this.readingRoomModel
        .find({
          teacher_id: teacher_id.id,
          timeline_events: {
            $elemMatch: {
              date: date ? date.day : this.date,
              month: date ? date.month : this.month,
              year: date ? date.year : this.year,
            },
          },
        })
        .populate(this.populateReadingRoom);

      return data;
    }
    return [];
  }
  async getOneReadingRoomByMonth(
    trialClass?: true | false | null,
    date?: DashboardMonthlyDto,
  ): Promise<any[]> {
    const DashboardMonthlyPipeline = [
      {
        $match: {
          'timeline_events.month': date.month,
          'timeline_events.year': date.year,
        },
      },
      {
        $unwind: '$timeline_events',
      },
      {
        $match: {
          'timeline_events.month': date.month,
          'timeline_events.year': date.year,
        },
      },
      {
        $group: {
          _id: {
            teacher_id: '$teacher_id',
            date: '$timeline_events.date',
          },
          totalLessons: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          lessonsByDate: {
            $push: {
              teacher_id: '$_id.teacher_id',
              totalLessons: '$totalLessons',
            },
          },
        },
      },
    ];
    if (trialClass !== null) {
      const data = await this.readingRoomModel
        .find(
          trialClass
            ? { course_registration_id: { $exists: true } }
            : { regular_course_registration_id: { $exists: true } },
        )
        .populate(
          trialClass === true
            ? this.populateTrialReadingRoom
            : this.populateRegularReadingRoom,
        );

      return data;
    } else if (trialClass === null) {
      const data = await this.readingRoomModel.aggregate(
        DashboardMonthlyPipeline,
      );
      return data;
    }
    return [];
  }
  async findByIdAndUpdateReadingRoom(
    id: string,
    data: unknown,
  ): Promise<ReadingRoomDocument> {
    const res = await this.readingRoomModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );
    return res;
  }
  async findByStudentIdAndUpdateReadingRoom(
    id: string,
    data: any,
    trialCourse?: boolean,
  ): Promise<ReadingRoomDocument> {
    const res = await this.readingRoomModel.findOneAndUpdate(
      { student_id: new mongoose.Types.ObjectId(id) },
      trialCourse
        ? { course_registration_id: new mongoose.Types.ObjectId(data) }
        : { regular_course_registration_id: new mongoose.Types.ObjectId(data) },
      {
        new: true,
      },
    );

    return res;
  }
}
