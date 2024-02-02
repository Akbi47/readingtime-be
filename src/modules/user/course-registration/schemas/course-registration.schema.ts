import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';

export type CourseRegistrationDocument = CourseRegistration & Document;

@Schema({ timestamps: true })
export class CourseRegistration {
  @Prop({ required: false, type: String })
  student_name: string;

  @Prop({ required: false, type: Number })
  student_age: number;

  @Prop({
    required: true,
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

  @Prop({ required: false, type: String })
  time: string;

  @Prop({ required: false, type: [String] })
  known_from: string[];

  @Prop({
    required: false,
    type: [
      {
        mon: Boolean,
        tue: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
        sun: Boolean,
      },
    ],
  })
  class_per_week: any[];
}

export const CourseRegistrationSchema =
  SchemaFactory.createForClass(CourseRegistration);
