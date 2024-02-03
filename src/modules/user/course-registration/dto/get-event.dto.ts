import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetEventDto {
  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  timeStart: string;

  @IsString()
  @IsOptional()
  timeEnd: string;
}
export class CourseRegistrationDto {
  @IsString()
  @IsOptional()
  student_name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GetEventDto)
  events: GetEventDto[];

  @IsString()
  @IsOptional()
  application_day: string;

  @IsNumber()
  @IsOptional()
  student_age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  course: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  start_class: string;

  @IsArray()
  @IsOptional()
  known_from: string[];
}
