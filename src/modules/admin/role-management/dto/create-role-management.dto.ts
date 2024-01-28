import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import CreateAccountUserDto from '../../user-management/account-user/dto/create-account-user.dto';

export class CreateRoleManagementDto extends CreateAccountUserDto {
  @IsString()
  @IsOptional()
  nick_name: string;

  @IsString()
  @IsOptional()
  ID: string;

  @IsString()
  @IsOptional()
  contract_type: string;

  @IsString()
  @IsOptional()
  contract: string;

  @IsDate()
  @IsOptional()
  start_date: Date;

  @IsDate()
  @IsOptional()
  resignation_date: Date;

  @IsNumber()
  @IsOptional()
  role: number;
}

// Export the class
export default CreateRoleManagementDto;
