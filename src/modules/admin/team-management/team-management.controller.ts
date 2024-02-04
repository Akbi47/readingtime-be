import { Controller, Get, Body, Post, Put, Query } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import {
  TeamManagement,
  TeamManagementDocument,
} from './schemas/team-management.schema';
import CreateTeamManagementDto from './dto/team-management.dto';
import { TeamManagementService } from './team-management.service';
import GetTeamManagementDto from './dto/get-team-management.dto';

@Controller('team-management')
export class TeamManagementController {
  constructor(private readonly teamManagementService: TeamManagementService) {}

  @Get('team-name')
  async getTeamManagement(
    @Query() query: GetTeamManagementDto,
  ): Promise<ResponseData<TeamManagement>> {
    try {
      const data = await this.teamManagementService.getOneTeamManagement(query);
      return new ResponseData<TeamManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TeamManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createTeamManagement(
    @Body() TeamManagementDto: CreateTeamManagementDto,
  ): Promise<ResponseData<TeamManagement>> {
    try {
      const data =
        await this.teamManagementService.createTeamManagement(
          TeamManagementDto,
        );
      return new ResponseData<TeamManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TeamManagement>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Get('get-detail')
  // async getTeamManagementById(
  //   @Body() body: { _id: string },
  // ): Promise<TeamManagement> {
  //   const { _id } = body;
  //   return this.teamManagementService.getTeamManagementById(_id);
  // }
  // @Put('update')
  // async updateTeamManagement(
  //   @Body() TeamManagementDto: TeamManagementDocument,
  // ): Promise<void> {
  //   await this.teamManagementService.updateTeamManagement(TeamManagementDto);
  // }
}
