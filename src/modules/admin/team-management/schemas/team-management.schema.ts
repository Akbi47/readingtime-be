import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountUser } from '../../user-management/account-user/schemas/account-user.schema';

export type TeamManagementDocument = TeamManagement & Document;

@Schema({ timestamps: true })
export class TeamManagement {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountUser.name,
  })
  user_id: MongooseSchema.Types.ObjectId;
}

export const TeamManagementSchema =
  SchemaFactory.createForClass(TeamManagement);
