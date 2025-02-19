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
import { Admission } from 'src/shares/enums/account-user.enum';

export class CreateAccountUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  user: string;

  @IsOptional()
  @IsString()
  user_english_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsEnum(GenderStatus)
  @IsOptional()
  gender: GenderStatus;

  @IsDate()
  @IsOptional()
  birth: Date;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsEnum(Admission)
  @IsOptional()
  admission: Admission;

  @IsArray()
  @IsOptional()
  list_of_tags: string[];

  @IsArray()
  @IsOptional()
  englishwing_member: string[];

  @IsString()
  @IsOptional()
  referral_code: string;

  @IsString()
  @IsOptional()
  signup_path: string;

  @IsString()
  @IsOptional()
  role?: number;
}

// Export the class
export default CreateAccountUserDto;
