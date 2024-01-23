import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenderStatus } from 'src/shares/enums/account-teacher.enum';
import {
  Admission,
  UserRole,
  UserStatus,
} from 'src/shares/enums/account-user.enum';

export type AccountUserDocument = AccountUser & Document;


@Schema({ timestamps: true })
export class AccountUser {
  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String })
  user_english_name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
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

  @Prop({ required: false, type: String })
  list_of_tags: Array<string>;

  @Prop({ required: false, type: String })
  englishwing_member: Array<string>;

  @Prop({ required: false, type: String })
  referral_code: string;

  @Prop({ required: false, type: String })
  signup_path: string;

  @Prop({
    required: false,
    type: Number,
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole[];

  @Prop({ type: String, enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;
}

export const AccountUserSchema = SchemaFactory.createForClass(AccountUser);
