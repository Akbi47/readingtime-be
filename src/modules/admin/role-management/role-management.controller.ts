import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

import { RoleManagementService } from './role-management.service';
import CreateRoleManagementDto from './dto/create-role-management.dto';
import { RoleManagement } from './schemas/role-management.schema';

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

  // @Post()
  // async createRoleManagement(
  //   @Body() roleManagementDto: CreateRoleManagementDto,
  // ): Promise<ResponseData<RoleManagement>> {
  //   try {
  //     const data =
  //       await this.roleManagementService.createRoleManagement(
  //         roleManagementDto,
  //       );
  //     return new ResponseData<RoleManagement>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     return new ResponseData<RoleManagement>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }

  @Get('get-detail')
  async getRoleManagementById(
    @Body() body: { _id: string },
  ): Promise<RoleManagement> {
    const { _id } = body;
    return this.roleManagementService.getRoleManagementById(_id);
  }

  // @Put()
  // async updateRoleManagement(
  //   @Body() roleManagement: RoleManagement,
  // ): Promise<ResponseData<RoleManagement>> {
  //   try {
  //     const data =
  //       await this.roleManagementService.updateRoleManagement(roleManagement);
  //     return new ResponseData<RoleManagement>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     return new ResponseData<RoleManagement>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }
}
