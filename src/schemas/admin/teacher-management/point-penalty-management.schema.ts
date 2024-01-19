import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountTeacher } from './account-teacher.schema';

export type PointPenaltyManagementDocument = PointPenaltyManagement & Document;

@Schema({ timestamps: true })
export class PointPenaltyManagement {
  @Prop({ required: true, type: String })
  teacher: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    index: true,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: true, type: String })
  division: string;

  @Prop({ required: true, type: String })
  items: string;

  @Prop({ required: false, type: String })
  texts?: string;
}

export const PointPenaltyManagementSchema = SchemaFactory.createForClass(
  PointPenaltyManagement,
);
