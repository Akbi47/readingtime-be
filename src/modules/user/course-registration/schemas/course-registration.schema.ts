import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseRegistrationDocument = CourseRegistration & Document;

@Schema({ timestamps: true })
export class CourseRegistration {
  @Prop({ required: false, type: String })
  student_name: string;

  @Prop({ required: false, type: Number })
  student_age: number;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: false, type: String })
  course: string;

  @Prop({ required: false, type: String })
  phone: string;

  @Prop({ required: false, type: String })
  start_class: string;

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

export const CourseRegistrationSchema =
  SchemaFactory.createForClass(CourseRegistration);
