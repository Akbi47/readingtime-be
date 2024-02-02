import { Prop } from '@nestjs/mongoose';

import { Days } from 'src/shares/enums/timeline.enum';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TimelineDto {
  @IsEnum(Days)
  @IsOptional()
  days: Days;

  @IsString()
  @IsOptional()
  time: string;
}

export class ReadingRoomDto {
  @IsMongoId()
  student_id: string;

  @IsMongoId()
  teacher_id: string;

  @IsMongoId()
  course_registration_id: string;

  @IsMongoId()
  regular_course_registration_id: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  class_per_week: TimelineDto[];

  @Prop({ required: false, type: Date })
  start_date_class: string;

  @Prop({ required: false, type: Date })
  end_date_class: string;

  @IsArray()
  @IsOptional()
  completed_days: string[];

  @IsArray()
  @IsOptional()
  absent_days: string[];

  @IsString()
  @IsOptional()
  book_title: string;

  @IsString()
  @IsOptional()
  product: string;

  @IsOptional()
  completed_class_detail: any[];

  @IsOptional()
  detail: any[];
}
