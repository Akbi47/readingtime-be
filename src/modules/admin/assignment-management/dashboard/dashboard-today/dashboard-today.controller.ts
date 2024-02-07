import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardTodayService } from './dashboard-today.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { DashboardDateDto } from './dto/dashboard-date.dto';

@Controller('dashboard-today')
export class DashboardTodayController {
  constructor(private readonly dashboardTodayService: DashboardTodayService) {}
  @Get()
  async getData(): Promise<any[]> {
    return await this.dashboardTodayService.getData();
  }
  @Get(':id')
  async getDataByTeacherAndDate(
    @Param() teacher_id: IdDto,
    @Query() date: DashboardDateDto,
  ): Promise<any[]> {
    return await this.dashboardTodayService.getDataByTeacherAndDate(
      teacher_id,
      date,
    );
  }
}
