import { Module } from '@nestjs/common';
import { MonthlyController } from './monthly.controller';
import { MonthlyService } from './monthly.service';

@Module({
  imports: [],
  controllers: [MonthlyController],
  providers: [MonthlyService],
})
export class MonthlyModule {}
