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
  time: string;

  @IsMongoId()
  @IsOptional()
  teacher_id: string;
}

export class UpdateTeacherRoomDto {
  @IsMongoId()
  @IsOptional()
  teacher_id: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  class_per_week: TimelineDto[];
}
