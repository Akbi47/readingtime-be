import { IsString, IsOptional, IsArray } from 'class-validator';
import { CreateTrialProductDto } from '../../free-trial-product/dto/create-trial-product.dto';

export class CreateRegularProductDto extends CreateTrialProductDto {
  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  discount_price: string;

  @IsArray()
  @IsOptional()
  study_time: string[];

  @IsString()
  @IsOptional()
  product_division: string;
}

// Export the class
export default CreateRegularProductDto;
