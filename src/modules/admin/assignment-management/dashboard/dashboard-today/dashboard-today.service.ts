import { Injectable } from '@nestjs/common';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';

@Injectable()
export class DashboardTodayService {
  constructor(private readonly readingRoomService: ReadingRoomService) {}
  async getData(): Promise<any[]> {
    return await this.readingRoomService.getOneReadingRoomByDay(null);
  }
}
