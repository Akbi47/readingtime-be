import { Controller, Get } from '@nestjs/common';
import { DashboardTodayService } from './dashboard-today.service';

@Controller('dashboard-today')
export class DashboardTodayController {
  constructor(private readonly dashboardTodayService: DashboardTodayService) {}

//   @Get()
//   async getData(): Promise<unknown[]> {
//     return await this.dashboardTodayService.getData();
//   }
}
