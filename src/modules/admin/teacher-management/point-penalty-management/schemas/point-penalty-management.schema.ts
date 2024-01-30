import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ClassFeedback } from '../../class-feedback/schemas/class-feedback.schema';
import * as moment from 'moment';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';

export type PointPenaltyManagementDocument = PointPenaltyManagement & Document;
const formatedDate = moment(Date.now()).format('DD/MM/YYYY');

export class PointPenaltyManagement {
  @Prop({
    required: true,
    type: String,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({
    required: true,
    type: String,
    ref: ClassFeedback.name,
  })
  class_feedback_id: string;

  @Prop({ required: true, type: String })
  division: string;

  @Prop({ required: true, type: String })
  items: string;

  @Prop({ required: false, type: String })
  texts?: string;

  @Prop({ required: false, type: String, default: formatedDate })
  date?: string;
}

export const PointPenaltyManagementSchema = SchemaFactory.createForClass(
  PointPenaltyManagement,
);
