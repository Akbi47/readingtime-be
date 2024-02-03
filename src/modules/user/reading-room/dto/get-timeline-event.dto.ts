import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetEventDto {
  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  timeStart: string;

  @IsString()
  @IsOptional()
  timeEnd: string;
}
export class TimelineEventDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GetEventDto)
  timeline_events: GetEventDto[];
}
