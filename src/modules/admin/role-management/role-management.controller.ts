import { Controller, Get, Body, Post, Put, Query } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { RoleManagementService } from './role-management.service';
import {
  RoleManagement,
  RoleManagementDocument,
} from './schemas/role-management.schema';
import { GetRoleManagementDto } from './dto/get-role-management.dto';
import CreateRoleManagementDto from './dto/create-role-management.dto';

@Controller('role-management')
export class RoleManagementController {
  constructor(private readonly roleManagementService: RoleManagementService) {}

  @Get('/')
  async getRoleManagement(
    @Query() query: GetRoleManagementDto,
  ): Promise<ResponseData<RoleManagement[]>> {
    try {
      const data = await this.roleManagementService.getRoleManagement(query);
      return new ResponseData<RoleManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<RoleManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createRoleManagement(
    @Body() roleManagementDto: CreateRoleManagementDto,
  ): Promise<ResponseData<RoleManagement>> {
    try {
      const data =
        await this.roleManagementService.createRoleManagement(
          roleManagementDto,
        );
      return new ResponseData<RoleManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<RoleManagement>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getRoleManagementById(
    @Body() body: { _id: string },
  ): Promise<RoleManagement> {
    const { _id } = body;
    return this.roleManagementService.getRoleManagementById(_id);
  }
  @Put('update')
  async updateRoleManagement(
    @Body() roleManagementDto: RoleManagementDocument,
  ): Promise<void> {
    await this.roleManagementService.updateRoleManagement(roleManagementDto);
  }
}
