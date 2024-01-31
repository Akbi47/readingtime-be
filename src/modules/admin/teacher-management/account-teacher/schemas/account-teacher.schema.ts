import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';
import {
  GenderStatus,
  Level,
  ProfileStatus,
  RecommendedLevel,
  RecommendedStudent,
  SpecialFeature,
} from 'src/shares/enums/account-teacher.enum';

import { WorkingHours } from '../../working-hours/schemas/working-hours.schema';

export type AccountTeacherDocument = AccountTeacher & Document;

@Schema({ timestamps: true })
export class AccountTeacher {
  @Prop({ required: true, type: String })
  teacher: string;

  @Prop({ required: false, type: String })
  teacher_id: string;

  @Prop({ required: true, type: String, unique: true })
  nick_name: string;

  @Prop({ required: false, type: String, unique: true })
  email: string;

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
  resignation_day: Date;

  @Prop({ required: false, type: Number })
  career_duration: number;

  @Prop({ required: false, type: String })
  description_career: string;

  @Prop({ required: false, type: String })
  certificate: string;

  @Prop({ required: false, type: String })
  resume: string;

  @Prop({
    required: false,
    type: String,
  })
  working_hours_id: string;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ required: false, type: String })
  team_name: string;

  @Prop({ required: false, type: String })
  tag: string;

  @Prop({ required: false, type: String, enum: ProfileStatus })
  status: ProfileStatus;

  @Prop({ required: false, type: String, enum: Level })
  level: Level;

  @Prop({ required: false, type: String, enum: SpecialFeature })
  special_feature: SpecialFeature;

  @Prop({ required: false, type: String })
  self_introduction: string;

  @Prop({ required: false, type: String, enum: RecommendedStudent })
  recommended_student: RecommendedStudent;

  @Prop({ required: false, type: String, enum: RecommendedLevel })
  recommended_level: RecommendedLevel;

  @Prop({ required: false, type: String })
  character: Array<string>;

  @Prop({ required: false, type: String })
  lesson_style: Array<string>;

  @Prop({ required: false, type: String })
  video: string;

  @Prop({ required: false, type: String })
  student_review: Array<string>;

  @Prop({ required: false, type: String })
  comment: Array<string>;

  @Prop({ required: false, type: Number })
  point: number;

  @Prop({ required: false, type: Number })
  penalty: number;
}

export const AccountTeacherSchema =
  SchemaFactory.createForClass(AccountTeacher);
