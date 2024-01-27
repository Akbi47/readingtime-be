// Import the necessary modules
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { GenderStatus } from 'src/shares/enums/account-teacher.enum';
import { Admission, UserStatus } from 'src/shares/enums/account-user.enum';

export class GetRoleManagementDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  user_english_name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(GenderStatus)
  @IsOptional()
  gender?: GenderStatus;

  @IsDate()
  @IsOptional()
  birth?: Date;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsEnum(Admission)
  @IsOptional()
  admission?: Admission;

  @IsString({ each: true })
  @IsOptional()
  list_of_tags?: string[];

  @IsString()
  @IsOptional()
  englishwing_member?: string[];

  @IsString()
  @IsOptional()
  referral_code?: string;

  @IsString()
  @IsOptional()
  signup_path?: string;

  @IsArray()
  @IsOptional()
  role?: number[];

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @IsDate()
  @IsOptional()
  last_login_start?: Date;

  @IsDate()
  @IsOptional()
  last_login_end?: Date;

  @IsDate()
  @IsOptional()
  registration_date_start?: Date;

  @IsDate()
  @IsOptional()
  registration_date_end?: Date;
}

// Export the class
export default GetRoleManagementDto;
