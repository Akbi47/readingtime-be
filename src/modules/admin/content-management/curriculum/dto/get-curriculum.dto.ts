import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class GetCurriculumDto {
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

  @IsBoolean()
  @IsOptional()
  whether_to_use: boolean;

  @IsDate()
  @IsOptional()
  reg_day: Date;
}

export default GetCurriculumDto;
