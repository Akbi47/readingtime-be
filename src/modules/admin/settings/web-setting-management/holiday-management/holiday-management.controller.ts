import { Controller, Get, Put, Body, Post, Delete } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { HolidayManagement } from './interface/holiday-management.interface';
import { HolidayManagementService } from './holiday-management.service';
import { HolidayManagementDto } from './dto/holiday-management.dto';

@Controller('holiday-management')
export class HolidayManagementController {
  constructor(
    private readonly holidayManagementService: HolidayManagementService,
  ) {}

  @Get()
  async getHolidayManagement(): Promise<ResponseData<HolidayManagement[]>> {
    try {
      const data = await this.holidayManagementService.getHolidayManagement();
      return new ResponseData<HolidayManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<HolidayManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateHolidayManagement(
    @Body() holidayManagement: HolidayManagement,
  ): Promise<ResponseData<HolidayManagement>> {
    try {
      const data =
        await this.holidayManagementService.updateHolidayManagement(
          holidayManagement,
        );
      return new ResponseData<HolidayManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<HolidayManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createHolidayManagement(
    @Body() holidayManagementDto: HolidayManagementDto,
  ): Promise<ResponseData<HolidayManagement>> {
    try {
      const data =
        await this.holidayManagementService.createHolidayManagement(
          holidayManagementDto,
        );
      return new ResponseData<HolidayManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<HolidayManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete()
  async deleteHolidayManagement(
    @Body('_id') _id: number,
  ): Promise<ResponseData<any>> {
    try {
      const data =
        await this.holidayManagementService.deleteHolidayManagementById(_id);
      return new ResponseData<any>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
