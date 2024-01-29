import { IsString, IsOptional, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class GetBookDto {
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

  @IsNumber()
  @IsOptional()
  grade: number;

  @IsNumber()
  @IsOptional()
  lexile: number;

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
