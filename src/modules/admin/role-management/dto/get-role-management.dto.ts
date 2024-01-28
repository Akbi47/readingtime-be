// Import the necessary modules
import { IsString, IsOptional } from 'class-validator';
import GetAccountUserDto from 'src/modules/admin/user-management/account-user/dto/get-account-user.dto';

export class GetRoleManagementDto extends GetAccountUserDto {
  @IsOptional()
  @IsString()
  nick_name?: string;

  @IsOptional()
  @IsString()
  ID?: string;
}

export default GetRoleManagementDto;
