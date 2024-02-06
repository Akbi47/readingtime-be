import { Injectable } from '@nestjs/common';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';

@Injectable()
export class DashboardTodayService {
  constructor(private readonly readingRoomService: ReadingRoomService) {}
  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom(null);
  }
}
