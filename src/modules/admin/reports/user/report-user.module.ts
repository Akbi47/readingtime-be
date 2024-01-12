import { Module } from '@nestjs/common';
import { ReportUserController } from './report-user.controller';
import { ReportUserService } from './report-user.service';

@Module({
  imports: [],
  controllers: [ReportUserController],
  providers: [ReportUserService],
})
export class ReportUserModule {}
