import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ClassFeedback } from '../../class-feedback/schemas/class-feedback.schema';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';
import { IsString, IsOptional } from 'class-validator';

export type PointPenaltyManagementDocument = PointPenaltyManagement & Document;
export class TimelineDto {
  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;
}
@Schema({ _id: false })
export class Timeline {
  @Prop({ required: false, type: String })
  day: string;

  @Prop({ required: false, type: String })
  month: string;

  @Prop({ required: false, type: String })
  year: string;
}
export const TimelineSchema = SchemaFactory.createForClass(Timeline);

@Schema({ timestamps: true })
export class PointPenaltyManagement {
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: AccountTeacher.name,
  })
  teacher_id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: ClassFeedback.name,
  })
  class_feedback_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: String })
  division: string;

  @Prop({ required: false, type: String })
  items: string;

  @Prop({ required: false, type: String })
  texts: string;

  @Prop({ required: false, type: [TimelineSchema] })
  date: Timeline[];

  @Prop({ required: false, type: String })
  comment: string;

  @Prop({ required: false, type: String })
  time: string;

  @Prop({ required: false, type: Number, default: 0 })
  score: number;
}

export const PointPenaltyManagementSchema = SchemaFactory.createForClass(
  PointPenaltyManagement,
);
