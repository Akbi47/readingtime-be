import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateCurriculumDto {
  @IsString()
  @IsOptional()
  curriculum_title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  division: string;

  @IsArray()
  @IsOptional()
  books: string[];

  @IsBoolean()
  @IsOptional()
  whether_to_use: boolean;

  @IsDate()
  @IsOptional()
  reg_day: Date;
}

export default UpdateCurriculumDto;
