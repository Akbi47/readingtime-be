import { Injectable } from '@nestjs/common';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { DashboardDateDto } from './dto/dashboard-date.dto';

@Injectable()
export class DashboardTodayService {
  constructor(private readonly readingRoomService: ReadingRoomService) {}
  async getData(): Promise<any[]> {
    return await this.readingRoomService.getOneReadingRoomByDay(null);
  }
  async getDataByTeacherAndDate(
    teacher_id: IdDto,
    date: DashboardDateDto,
  ): Promise<any[]> {
    return await this.readingRoomService.getReadingRoomByDay(
      null,
      teacher_id,
      date,
    );
  }
}
