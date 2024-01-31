import { Schema } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class GetTrialClassDto {
  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  day_of_week: string;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  product: string;

  @IsOptional()
  @IsString()
  count_total: string;

  @IsOptional()
  @IsString()
  book_title: string;

  @IsOptional()
  @IsString()
  team: string;

  @IsOptional()
  @IsString()
  teacher: string;

  @IsOptional()
  @IsString()
  teacher_id: string;

  @IsOptional()
  @IsString()
  substitute_teacher: string;

  @IsOptional()
  @IsString()
  student: string;

  @IsOptional()
  @IsString()
  student_id: string;

  @IsOptional()
  @IsString()
  class_status: string;

  @IsOptional()
  @IsString()
  details_class_status: string;

  @IsOptional()
  @IsString()
  complaint: string;
}
