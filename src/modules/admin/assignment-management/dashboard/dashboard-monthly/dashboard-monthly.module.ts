import { Module } from '@nestjs/common';
import { DashboardMonthlyService } from './dashboard-monthly.service';
import { DashboardMonthlyController } from './dashboard-monthly.controller';
import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';

@Module({
  imports: [ReadingRoomModule],
  controllers: [DashboardMonthlyController],
  providers: [DashboardMonthlyService],
  exports: [DashboardMonthlyService],
})
export class DashboardMonthlyModule {}
