import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateTrialProductDto {
  @IsString()
  product_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsMongoId()
  @IsOptional()
  curriculum: string;

  @IsString()
  @IsOptional()
  country_of_sale: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsArray()
  @IsOptional()
  study_time: string[];

  @IsString()
  @IsOptional()
  reg_day: string;

  @IsString()
  @IsOptional()
  exp_day: string;

  @IsNumber()
  @IsOptional()
  class_day_total: number;

  @IsNumber()
  @IsOptional()
  class_day_per_week: number;

  @IsString()
  @IsOptional()
  whether_to_use: string;
}

// Export the class
export default CreateTrialProductDto;
