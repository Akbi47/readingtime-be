import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';
import { GenderStatus } from 'src/shares/enums/account-teacher.enum';
import {
  Admission,
  UserRole,
  UserStatus,
} from 'src/shares/enums/account-user.enum';

export type AccountUserDocument = AccountUser & Document;
const formattedDate = moment(Date.now()).format('DD/MM/YYYY');
@Schema({ timestamps: true })
export class AccountUser {
  @Prop({ required: false, type: String, unique: true })
  username: string;

  @Prop({ required: false, type: String })
  user: string;

  @Prop({ required: false, type: Number })
  ID: number;

  @Prop({ required: false, type: String })
  user_english_name: string;

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
  phone: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  picture: string;

  @Prop({ required: false, type: String, enum: Admission })
  admission: Admission;

  @Prop({ required: false, type: [String] })
  list_of_tags: string[];

  @Prop({ required: false, type: [String] })
  englishwing_member: string[];

  @Prop({ required: false, type: String })
  referral_code: string;

  @Prop({ required: false, type: String })
  signup_path: string;

  @Prop({
    required: false,
    // type: [{ type: Number, enum: UserRole }],
    enum: UserRole,
    type: Number,
    default: UserRole.user,
  })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Prop({ required: false, type: String, default: formattedDate })
  last_login: string;

  @Prop({ required: false, type: String, default: formattedDate })
  reg_day: string;

  @Prop({ required: false, type: String })
  refresh_token: string;
}

export const AccountUserSchema = SchemaFactory.createForClass(AccountUser);
