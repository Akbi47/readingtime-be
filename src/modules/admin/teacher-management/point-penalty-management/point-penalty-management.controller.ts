import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

import { PointPenaltyManagementService } from './point-penalty-management.service';
import { CreatePointPenaltyManagementDto } from './dto/create-point-penalty-management.dto';

import {
  PointPenaltyManagement,
  TimelineDto,
} from './schemas/point-penalty-management.schema';

@Controller('point-penalty')
export class PointPenaltyManagementController {
  constructor(
    private readonly pointPenaltyManagementService: PointPenaltyManagementService,
  ) {}

  @Get()
  async getPointPenaltyManagement(
    @Query() date: TimelineDto,
  ): Promise<ResponseData<PointPenaltyManagement[]>> {
    try {
      const data =
        await this.pointPenaltyManagementService.getPointPenaltyManagement(
          date,
        );
      return new ResponseData<PointPenaltyManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PointPenaltyManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Get('month')
  // async getPointsAndPenaltiesInMonth(
  //   @Body() requestBody: { month: number; year: number },
  // ): Promise<ResponseData<any>> {
  //   try {
  //     const { month, year } = requestBody;
  //     const data =
  //       await this.pointPenaltyManagementService.getPointsAndPenaltiesInMonth(
  //         month,
  //         year,
  //       );
  //     return new ResponseData<any>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR);
  //   }
  // }

  @Post()
  async createPointPenaltyManagement(
    @Body() pointPenaltyManagementDto: CreatePointPenaltyManagementDto,
  ): Promise<ResponseData<PointPenaltyManagement>> {
    try {
      const data =
        await this.pointPenaltyManagementService.createPointPenaltyManagement(
          pointPenaltyManagementDto,
        );
      return new ResponseData<PointPenaltyManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PointPenaltyManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
