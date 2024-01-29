import { IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  date?: string;
}
