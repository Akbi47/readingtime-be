import { Module } from '@nestjs/common';
import { DashboardTodayService } from './dashboard-today.service';
import { DashboardTodayController } from './dashboard-today.controller';

@Module({
  providers: [DashboardTodayService],
  exports: [DashboardTodayService],
  controllers: [DashboardTodayController]
})
export class DashboardTodayModule {}
