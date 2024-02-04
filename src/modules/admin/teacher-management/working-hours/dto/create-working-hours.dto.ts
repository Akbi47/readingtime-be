import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
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
  time_start: string;

  @IsString()
  @IsOptional()
  time_end: string;
}
export class CreateWorkingHoursDto {
  @IsString()
  @IsOptional()
  teacher: string;

  @IsString()
  @IsOptional()
  nick_name: string;

  @IsString()
  @IsOptional()
  team_name: string;

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
