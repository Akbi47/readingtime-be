import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Document } from 'mongoose';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';

export type RoleManagementDocument = RoleManagement & Document;
const formattedDate = moment(Date.now()).format('DD/MM/YYYY');
@Schema({ timestamps: true })
export class RoleManagement extends AccountUser {
  @Prop({ required: true, type: String })
  nick_name: string;

  @Prop({ required: false, type: Number })
  ID: number;

  @Prop({ required: false, type: String })
  contract_type: string;

  @Prop({ required: false, type: String, ref: AccountUser.name })
  user_id: string;

  @Prop({ required: false, type: String })
  contract: string;

  @Prop({ required: false, type: String, default: formattedDate })
  start_date: string;

  @Prop({ required: false, type: String, default: formattedDate })
  resignation_date: string;
}

export const RoleManagementSchema =
  SchemaFactory.createForClass(RoleManagement);
