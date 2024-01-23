import { Body, Controller, Post } from '@nestjs/common';
import { RegularClassService } from './regular-class.service';

@Controller('regular-class')
export class RegularClassController {
  constructor(private readonly regularClassService: RegularClassService) {}

  @Post('data-create')
  async createData(@Body() data: any) {
    try {
      const res = await this.regularClassService.createData(data);
      return res;
    } catch (error) {
      return error;
    }
  }
}
