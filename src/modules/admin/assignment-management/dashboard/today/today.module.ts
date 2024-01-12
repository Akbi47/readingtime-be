import { Module } from '@nestjs/common';
import { TodayController } from './today.controller';
import { TodayService } from './today.service';

@Module({
  imports: [],
  controllers: [TodayController],
  providers: [TodayService],
})
export class TodayModule {}
