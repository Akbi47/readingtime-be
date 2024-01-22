import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { VacationResignationManagement } from './interface/vacation-resignation-management.interface';
import { VacationResignationManagementService } from './vacation-resignation-management.service';
import { VacationResignationManagementDto } from './dto/vacation-resignation-management.dto';

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
    @Body() vacationResignationManagementDto: VacationResignationManagementDto,
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
    @Body() vacationResignationManagement: VacationResignationManagement,
  ): Promise<ResponseData<VacationResignationManagement>> {
    try {
      const data =
        await this.vacationResignationManagementService.updateVacationResignationManagement(
          vacationResignationManagement,
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
}
