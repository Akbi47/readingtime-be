import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePointPenaltyManagementDto {
  @IsString()
  @IsOptional()
  teacher_id: string;

  @IsString()
  @IsOptional()
  class_feedback_id: string;

  @IsString()
  @IsOptional()
  division: string;

  @IsString()
  @IsOptional()
  items: string;

  @IsString()
  @IsOptional()
  texts?: string;

  @IsOptional()
  date: any;

  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsNumber()
  @IsOptional()
  score?: string;
}
