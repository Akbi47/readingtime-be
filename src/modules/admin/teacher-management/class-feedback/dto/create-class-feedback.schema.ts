import { Schema } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';

import { ClassFeedbackStatus } from 'src/shares/enums/account-teacher.enum';

@Schema({ timestamps: true })
export class CreateClassFeedbackDto {
  @IsString()
  @IsOptional()
  team: string;

  @IsString()
  @IsOptional()
  teacher: string;

  @IsString()
  @IsOptional()
  paper_no: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  video: string;

  @IsString()
  @IsOptional()
  feedback: string;

  @IsString()
  @IsOptional()
  score: string;

  @IsString()
  @IsOptional()
  teacher_comment: string;

  @IsString()
  @IsOptional()
  status: ClassFeedbackStatus;
}
