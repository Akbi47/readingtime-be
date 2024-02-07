import { Injectable } from '@nestjs/common';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { DashboardMonthlyDto } from './dto/dashboard-monthly.dto';

@Injectable()
export class DashboardMonthlyService {
  constructor(private readonly readingRoomService: ReadingRoomService) {}
  async getData(date: DashboardMonthlyDto): Promise<any[]> {
    return await this.readingRoomService.getOneReadingRoomByMonth(null, date);
  }
}
