import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ClassFeedbackStatus } from 'src/shares/enums/account-teacher.enum';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';

export type ClassFeedbackDocument = ClassFeedback & Document;

@Schema({ timestamps: true })
export class ClassFeedback {
  @Prop({ required: false, type: String })
  team: string;

  @Prop({ required: false, type: String })
  teacher: string;

  @Prop({
    required: true,
    type: String,
    index: true,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: false, type: String })
  paper_no: string;

  @Prop({ required: false, type: String })
  date: string;

  @Prop({ required: false, type: String })
  video: string;

  @Prop({ required: false, type: String })
  feedback: string;

  @Prop({ required: false, type: String })
  score: string;

  @Prop({ required: false, type: String })
  teacher_comment: string;

  @Prop({ required: false, type: String, enum: ClassFeedbackStatus })
  status: ClassFeedbackStatus;
}

export const ClassFeedbackSchema = SchemaFactory.createForClass(ClassFeedback);
