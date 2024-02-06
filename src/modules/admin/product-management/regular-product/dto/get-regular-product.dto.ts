import { IsString, IsOptional, IsArray } from 'class-validator';
import { GetTrialProductDto } from '../../free-trial-product/dto/get-trial-product.dto';

export class GetRegularProductDto extends GetTrialProductDto {
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
export default GetRegularProductDto;
