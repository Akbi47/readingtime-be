import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { BaseDto } from 'src/shares/dtos/base.dto';

export class GetBookDto extends BaseDto {
  @IsString()
  @IsOptional()
  book_title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsOptional()
  class_goal: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  level: string;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  vocab: number;

  @IsString()
  @IsOptional()
  grade: string;

  @IsString()
  @IsOptional()
  lexile: string;

  @IsString()
  @IsOptional()
  cover_image: string;

  @IsString()
  @IsOptional()
  attachments: string;

  @IsBoolean()
  @IsOptional()
  whether_to_use: boolean;

  @IsDate()
  @IsOptional()
  reg_day: Date;
}

export default GetBookDto;
