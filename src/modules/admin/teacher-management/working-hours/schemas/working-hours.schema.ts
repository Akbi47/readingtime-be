import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountTeacher } from 'src/schemas/admin/teacher-management/account-teacher.schema';

export type WorkingHoursDocument = WorkingHours & Document;

@Schema({ timestamps: true })
export class WorkingHours {
  @Prop({
    required: true,
    type: String,
    index: true,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: false, type: String })
  teacher_name: string;

  @Prop({ required: false, type: Number })
  student_age: number;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: false, type: String })
  course: string;

  @Prop({ required: false, type: String })
  phone: string;

  @Prop({ required: false, type: Date })
  start_class: Date;

  @Prop({ required: false, type: String })
  time: string;

  @Prop({ required: false, type: [String] })
  known_from: string[];

  @Prop({
    required: false,
    type: [
      {
        mon: Boolean,
        tue: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
        sun: Boolean,
      },
    ],
  })
  class_per_week: any[];
}

export const WorkingHoursSchema = SchemaFactory.createForClass(WorkingHours);
