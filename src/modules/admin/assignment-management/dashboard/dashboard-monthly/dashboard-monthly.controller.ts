import { Controller, Get, Query } from '@nestjs/common';
import { DashboardMonthlyService } from './dashboard-monthly.service';
import { DashboardMonthlyDto } from './dto/dashboard-monthly.dto';

@Controller('dashboard-monthly')
export class DashboardMonthlyController {
  constructor(
    private readonly dashboardMonthlyService: DashboardMonthlyService,
  ) {}
  @Get()
  async getData(@Query() date: DashboardMonthlyDto): Promise<any[]> {
    return await this.dashboardMonthlyService.getData(date);
  }
}
