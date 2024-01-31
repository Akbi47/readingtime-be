import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountTeacher } from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';

export type TrialClassDocument = TrialClass & Document;

@Schema({ timestamps: true })
export class TrialClass {
  @Prop({ required: false, type: Date })
  date: Date;

  @Prop({ required: false, type: String })
  day_of_week: string;

  @Prop({ required: false, type: String })
  time: string;

  @Prop({ required: false, type: String })
  product: string;

  @Prop({ required: false, type: String })
  count_total: string;

  @Prop({ required: false, type: String })
  book_title: string;

  @Prop({ required: false, type: String })
  team: string;

  @Prop({ required: false, type: String })
  teacher: string;

  @Prop({
    required: false,
    type: String,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: false, type: String })
  substitute_teacher: string;

  @Prop({ required: false, type: String })
  student: string;

  @Prop({
    required: false,
    type: String,
    ref: AccountUser.name,
  })
  student_id: string;

  @Prop({ required: false, type: String })
  class_status: string;

  @Prop({ required: false, type: String })
  details_class_status: string;

  @Prop({ required: false, type: String })
  complaint: string;
}

export const TrialClassSchema = SchemaFactory.createForClass(TrialClass);
