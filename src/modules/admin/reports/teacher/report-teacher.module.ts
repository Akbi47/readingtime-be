import { Module } from '@nestjs/common';
import { ReportTeacherController } from './report-teacher.controller';
import { ReportTeacherService } from './report-teacher.service';

@Module({
  imports: [],
  controllers: [ReportTeacherController],
  providers: [ReportTeacherService],
})
export class ReportTeacherModule {}
