import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';
import * as moment from 'moment';
import { Days } from 'src/shares/enums/timeline.enum';

export type CourseRegistrationDocument = CourseRegistration & Document;
const formattedDate = moment(Date.now()).format('DD/MM/YYYY');

@Schema({ _id: false })
export class Timeline {
  @Prop({ required: false, type: String, enum: Days })
  days: Days;

  @Prop({ required: false, type: String })
  time: string;
}
export const TimelineSchema = SchemaFactory.createForClass(Timeline);

@Schema({ timestamps: true })
export class CourseRegistration {
  @Prop({ required: false, type: String })
  student_name: string;

  @Prop({ required: false, type: Number })
  student_age: number;

  @Prop({ required: false, type: [{ type: TimelineSchema }] })
  class_per_week: Timeline[];

  @Prop({ required: false, type: String, default: formattedDate })
  application_day: string;

  @Prop({ required: false, type: String, unique: true })
  email: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountUser.name,
  })
  user_account: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: String })
  course: string;

  @Prop({ required: false, type: String })
  phone: string;

  @Prop({ required: false, type: String })
  start_class: string;

  @Prop({ required: false, type: [String] })
  known_from: string[];
}

export const CourseRegistrationSchema =
  SchemaFactory.createForClass(CourseRegistration);
