// Import the necessary modules
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';
import {
  GenderStatus,
  ProfileStatus,
  Level,
  SpecialFeature,
  RecommendedStudent,
  RecommendedLevel,
} from 'src/shares/enums/account-teacher.enum';

export class CreateAccountTeacherDto {
  @IsString()
  teacher: string;

  @IsString()
  nick_name: string;

  @IsEmail()
  email: string;

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
  timezone: string;

  @IsString()
  @IsOptional()
  tag: string;

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
  resignation_day?: Date;

  @IsNumber()
  @IsOptional()
  career_duration: number;

  @IsNumber()
  @IsOptional()
  point: number;

  @IsNumber()
  @IsOptional()
  penalty: number;

  @IsString()
  @IsOptional()
  description_career: string;

  @IsString()
  @IsOptional()
  certificate: string;

  @IsString()
  @IsOptional()
  resume: string;

  @IsString()
  @IsOptional()
  working_hours: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  team_name: string;

  @IsEnum(ProfileStatus)
  @IsOptional()
  status: ProfileStatus;

  @IsEnum(Level)
  @IsOptional()
  level: Level;

  @IsEnum(SpecialFeature)
  @IsOptional()
  special_feature: SpecialFeature;

  @IsString()
  @IsOptional()
  self_introduction: string;

  @IsEnum(RecommendedStudent)
  @IsOptional()
  recommended_student: RecommendedStudent;

  @IsEnum(RecommendedLevel)
  @IsOptional()
  recommended_level: RecommendedLevel;

  @IsString()
  @IsOptional()
  character: string;

  @IsString()
  @IsOptional()
  lesson_style: string;

  @IsString()
  @IsOptional()
  video: string;

  @IsString({ each: true })
  @IsOptional()
  student_review: string[];

  @IsString({ each: true })
  @IsOptional()
  comment: string[];
}

// Export the class
export default CreateAccountTeacherDto;
