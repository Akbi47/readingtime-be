import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountTeacher } from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';
import { CourseRegistration } from '../../course-registration/schemas/course-registration.schema';
import { RegularCourseRegistration } from '../../regular-course-registration/schemas/regular-course-registration.schema';
import { Days } from 'src/shares/enums/timeline.enum';

export type ReadingRoomDocument = ReadingRoom & Document;
@Schema({ _id: false })
export class Timeline {
  @Prop({ required: false, type: String, enum: Days })
  days: Days;

  @Prop({ required: false, type: String })
  time: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountTeacher.name,
  })
  teacher_id: MongooseSchema.Types.ObjectId;
}
export const TimelineSchema = SchemaFactory.createForClass(Timeline);
@Schema({ _id: false })
export class Event {
  @Prop({ required: false, type: String })
  day: string;

  @Prop({ required: false, type: String })
  date: string;

  @Prop({ required: false, type: String })
  month: string;

  @Prop({ required: false, type: String })
  year: string;

  @Prop({ required: false, type: String })
  timeStart: string;

  @Prop({ required: false, type: String })
  timeEnd: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

@Schema({ timestamps: true })
export class ReadingRoom {
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountUser.name,
  })
  student_id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountUser.name,
  })
  teacher_id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: CourseRegistration.name,
  })
  course_registration_id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: RegularCourseRegistration.name,
  })
  regular_course_registration_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: [{ type: TimelineSchema }] })
  class_per_week: Timeline[];

  @Prop({ required: false, type: [{ type: EventSchema }] })
  timeline_events: Event[];

  @Prop({ required: false, type: Date })
  start_date_class: Date;

  @Prop({ required: false, type: Date })
  end_date_class: Date;

  @Prop({ required: false, type: [Date] })
  completed_days: Date[];

  @Prop({ required: false, type: [Date] })
  absent_days: Date[];

  @Prop({ required: false, type: String })
  book_title: string;

  @Prop({ required: false, type: String })
  product: string;

  @Prop({
    required: false,
    type: [
      {
        date: Date,
        level: String,
        book_title: String,
        teacher: String,
      },
    ],
  })
  completed_class_detail: any[];

  @Prop({
    required: false,
    type: [
      {
        overallScore: Number,
        mispronouncedWords: [String],
        readingAloud: Boolean,
        comprehension: String,
      },
    ],
  })
  detail: any[];
}

export const ReadingRoomSchema = SchemaFactory.createForClass(ReadingRoom);
