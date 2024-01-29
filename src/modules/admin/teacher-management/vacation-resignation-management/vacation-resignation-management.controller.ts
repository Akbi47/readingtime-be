import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { VacationResignationManagementService } from './vacation-resignation-management.service';
import { CreateVacationResignationManagementDto } from './dto/create-vacation-resignation-management.dto';
import {
  VacationResignationManagement,
  VacationResignationManagementDocument,
} from './schemas/vacation-resignation-management.schema';

@Controller('vacation-resignation')
export class VacationResignationManagementController {
  constructor(
    private readonly vacationResignationManagementService: VacationResignationManagementService,
  ) {}

  @Get()
  async getVacationResignationManagement(): Promise<
    ResponseData<VacationResignationManagement[]>
  > {
    try {
      const data =
        await this.vacationResignationManagementService.getVacationResignationManagement();
      return new ResponseData<VacationResignationManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<VacationResignationManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createVacationResignationManagement(
    @Body()
    vacationResignationManagementDto: CreateVacationResignationManagementDto,
  ): Promise<ResponseData<VacationResignationManagement>> {
    try {
      const data =
        await this.vacationResignationManagementService.createVacationResignationManagement(
          vacationResignationManagementDto,
        );
      return new ResponseData<VacationResignationManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<VacationResignationManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getVacationResignationManagementById(
    @Body() body: { _id: string },
  ): Promise<VacationResignationManagement> {
    const { _id } = body;
    return this.vacationResignationManagementService.getVacationResignationManagementById(
      _id,
    );
  }

  @Put()
  async updateVacationResignationManagement(
    @Body()
    vacationResignationManagement: VacationResignationManagementDocument,
  ): Promise<void> {
    await this.vacationResignationManagementService.updateVacationResignationManagement(
      vacationResignationManagement,
    );
  }
}
