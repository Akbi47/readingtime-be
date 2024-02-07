import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Days } from 'src/shares/enums/timeline.enum';
export class TimelineDto {
  @IsEnum(Days)
  @IsOptional()
  days: Days;

  @IsString()
  @IsOptional()
  time: string;
}
export class CourseRegistrationDto {
  @IsString()
  @IsOptional()
  student_name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  class_per_week: TimelineDto[];

  @IsString()
  @IsOptional()
  application_day: string;

  @IsNumber()
  @IsOptional()
  student_age: number;

  @IsEmail()
  @IsOptional()
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

  @IsMongoId()
  @IsOptional()
  trial_product_id: string;

  @IsArray()
  @IsOptional()
  known_from: string[];
}
