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
export class GetWorkingHoursDto {
  @IsMongoId()
  teacher_id: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  timesheet: TimelineDto[];
}
