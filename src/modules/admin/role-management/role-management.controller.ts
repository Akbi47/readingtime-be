import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { RoleManagement } from './interface/role-management.interface';
import { RoleManagementService } from './role-management.service';
import { RoleManagementDto } from './dto/role-management.dto';

@Controller('role-management')
export class RoleManagementController {
  constructor(private readonly roleManagementService: RoleManagementService) {}

  @Get()
  async getRoleManagement(): Promise<ResponseData<RoleManagement[]>> {
    try {
      const data = await this.roleManagementService.getRoleManagement();
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

  @Post()
  async createRoleManagement(
    @Body() roleManagementDto: RoleManagementDto,
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
        null,
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

  @Put()
  async updateRoleManagement(
    @Body() roleManagement: RoleManagement,
  ): Promise<ResponseData<RoleManagement>> {
    try {
      const data =
        await this.roleManagementService.updateRoleManagement(roleManagement);
      return new ResponseData<RoleManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<RoleManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
