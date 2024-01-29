import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { WorkingHoursService } from './working-hours.service';

@Controller('working-hours')
export class WorkingHoursController {
  constructor(private readonly workingHoursService: WorkingHoursService) {}

  // @Get()
  // async getWorkingHours(): Promise<ResponseData<WorkingHours[]>> {
  //   try {
  //     const data = await this.workingHoursService.getWorkingHours();
  //     return new ResponseData<WorkingHours[]>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<WorkingHours[]>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }

  // @Get('detail')
  // async getWorkingHours_id(
  //   @Body() _id: string,
  // ): Promise<ResponseData<WorkingHours>> {
  //   try {
  //     const data = await this.workingHoursService.getWorkingHoursById(_id);
  //     return new ResponseData<WorkingHours>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<WorkingHours>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }

  // @Put()
  // async updateWorkingHours(
  //   @Body() WorkingHours: WorkingHours,
  // ): Promise<ResponseData<WorkingHours>> {
  //   try {
  //     const data =
  //       await this.workingHoursService.updateWorkingHours(WorkingHours);
  //     return new ResponseData<WorkingHours>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<WorkingHours>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }

  // @Post()
  // async createWorkingHours(
  //   @Body() workingHoursDto: WorkingHoursDto,
  // ): Promise<ResponseData<WorkingHours>> {
  //   try {
  //     const data =
  //       await this.workingHoursService.createWorkingHours(workingHoursDto);
  //     return new ResponseData<WorkingHours>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<WorkingHours>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }
}
