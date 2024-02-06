import { Module } from '@nestjs/common';
import { DashboardTodayService } from './dashboard-today.service';
import { DashboardTodayController } from './dashboard-today.controller';
import { ReadingRoomModule } from 'src/modules/user/reading-room/reading-room.module';

@Module({
  imports: [ReadingRoomModule],
  controllers: [DashboardTodayController],
  providers: [DashboardTodayService],
  exports: [DashboardTodayService],
})
export class DashboardTodayModule {}
