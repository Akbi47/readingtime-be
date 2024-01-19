import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenderStatus } from 'src/shares/enums/gender.enum';

export type AccountTeacherDocument = AccountTeacher & Document;

@Schema({ timestamps: true })
export class AccountTeacher {
  @Prop({ required: false, type: String })
  teacher: string;

  @Prop({ required: false, type: String })
  nickname: string;

  @Prop({ required: false, type: String })
  email_address: string;

  @Prop({ required: false, type: String })
  password: string;

  @Prop({
    required: false,
    type: String,
    enum: GenderStatus,
    default: GenderStatus.MALE,
  })
  gender: GenderStatus;

  @Prop({ required: false, type: Date })
  birth: Date;

  @Prop({ required: false, type: String })
  country: string;

  @Prop({ required: false, type: String })
  timezone: string;

  @Prop({ required: false, type: String })
  contract_type: string;

  @Prop({ required: false, type: String })
  contract: string;

  @Prop({ required: false, type: Date })
  start_date: Date;

  @Prop({ required: false, type: Date })
  resignation_day?: Date;

  @Prop({ required: false, type: Number })
  career_duration: number;

  @Prop({ required: false, type: String })
  description_career: [string];

  @Prop({ required: false, type: String })
  certificate: string;

  @Prop({ required: false, type: String })
  resume: string;

  @Prop({ required: false, type: String })
  working_hours: string;

  @Prop({ required: false, type: String })
  team_name: string;

  @Prop({ required: false, type: String })
  status: [string];

  @Prop({ required: false, type: String })
  level: [string];

  @Prop({ required: false, type: String })
  special_feature: [string];

  @Prop({ required: false, type: String })
  self_introduction: string;

  @Prop({ required: false, type: String })
  recommended_student: [string];

  @Prop({ required: false, type: String })
  recommended_level: [string];

  @Prop({ required: false, type: String })
  character: [string];

  @Prop({ required: false, type: String })
  lesson_style: [string];

  @Prop({ required: false, type: String })
  video: string;

  @Prop({ required: false, type: String })
  student_review: [string];

  @Prop({ required: false, type: String })
  comment: [string];
}

export const AccountTeacherSchema =
  SchemaFactory.createForClass(AccountTeacher);
