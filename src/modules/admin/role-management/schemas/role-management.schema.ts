import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountUser } from 'src/modules/admin/user-management/account-user/schemas/account-user.schema';

export type RoleManagementDocument = RoleManagement & Document;

@Schema({ timestamps: true })
export class RoleManagement extends AccountUser {
  @Prop({ required: true, type: String })
  nick_name: string;

  @Prop({ required: false, type: String })
  contract_type: string;

  @Prop({ required: false, type: String })
  contract: string;

  @Prop({ required: false, type: Date })
  start_date: Date;

  @Prop({ required: false, type: Date })
  resignation_date: Date;
}

export const RoleManagementSchema =
  SchemaFactory.createForClass(RoleManagement);
