import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateDateDto {
  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;
}
export class CreatePointPenaltyManagementDto {
  @IsString()
  @IsOptional()
  teacher_id?: string;

  @IsString()
  @IsOptional()
  class_feedback_id?: string;

  @IsString()
  @IsOptional()
  division?: string;

  @IsString()
  @IsOptional()
  items?: string;

  @IsString()
  @IsOptional()
  texts?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDateDto)
  date?: CreateDateDto[];

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  time?: string;

  @IsNumber()
  @IsOptional()
  score?: string;
}
