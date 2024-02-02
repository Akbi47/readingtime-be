import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Days } from 'src/shares/enums/timeline.enum';
export class TimelineDto {
  @IsEnum(Days)
  @IsOptional()
  days: Days;

  @IsString()
  @IsOptional()
  time: string;
}
export class CreateWorkingHoursDto {
  @IsString()
  @IsOptional()
  teacher_name: string;

  @IsString()
  @IsOptional()
  teacher_nickname: string;

  @IsString()
  @IsOptional()
  teacher_id: string;

  @IsString()
  @IsOptional()
  team: string;

  @IsString()
  @IsOptional()
  team_leader: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  timesheet: TimelineDto[];
}
