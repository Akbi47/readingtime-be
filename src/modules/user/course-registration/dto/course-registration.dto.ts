import {
  IsArray,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CourseRegistrationDto {
  @IsString()
  @IsOptional()
  student_name: string;

  @IsNumber()
  @IsOptional()
  student_age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  course: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  start_class: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsArray()
  @IsOptional()
  known_from: string[];

  @IsArray()
  class_per_week: any[];
}
