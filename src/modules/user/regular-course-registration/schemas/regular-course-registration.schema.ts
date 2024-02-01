import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CourseRegistration } from '../../course-registration/schemas/course-registration.schema';

export type RegularCourseRegistrationDocument = RegularCourseRegistration &
  Document;

@Schema({ timestamps: true })
export class RegularCourseRegistration extends CourseRegistration {}

export const RegularCourseRegistrationSchema = SchemaFactory.createForClass(
  RegularCourseRegistration,
);
