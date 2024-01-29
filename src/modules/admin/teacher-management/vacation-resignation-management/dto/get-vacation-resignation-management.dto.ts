import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LeaveInfo } from 'src/shares/enums/account-teacher.enum';

export class GetVacationResignationManagementDto {
  @IsString()
  @IsOptional()
  teacher_id: string;

  @IsString()
  @IsOptional()
  paper_no: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(LeaveInfo)
  @IsOptional()
  part: LeaveInfo;

  @IsString()
  @IsOptional()
  team_leader_name: string;

  @IsString()
  @IsOptional()
  director_name: string;

  @IsNumber()
  @IsOptional()
  day: number;

  @IsString()
  @IsOptional()
  period: string;

  @IsString()
  @IsOptional()
  reason: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsString()
  @IsOptional()
  letter: string;
}
