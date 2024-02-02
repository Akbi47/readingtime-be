import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';

export class GetTrialProductDto {
  @IsString()
  product_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
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

  @IsDate()
  @IsOptional()
  reg_day: Date;

  @IsDate()
  @IsOptional()
  exp_day: Date;

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
export default GetTrialProductDto;
