import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetWorkingHoursDto {
  @IsString()
  @IsOptional()
  teacher_name: string;

  @IsString()
  @IsOptional()
  teacher_nickname: string;

  @IsString()
  @IsOptional()
  team: string;

  @IsString()
  @IsOptional()
  team_leader: string;

  @IsArray()
  @IsOptional()
  timesheet: any[];
}
