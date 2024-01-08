import { Controller, Get, Put, Body, Post, Delete } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MenuPermissionManagement } from './interface/menu-permission-management.interface';
import { MenuPermissionManagementService } from './menu-permission-management.service';
import { MenuPermissionManagementDto } from './dto/menu-permission-management.dto';

@Controller('menu-permission-management')
export class MenuPermissionManagementController {
  constructor(
    private readonly menuPermissionManagementService: MenuPermissionManagementService,
  ) {}

  @Get()
  async getMenuPermissionManagement(): Promise<
    ResponseData<MenuPermissionManagement[]>
  > {
    try {
      const data =
        await this.menuPermissionManagementService.getMenuPermissionManagement();
      return new ResponseData<MenuPermissionManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MenuPermissionManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateMenuPermissionManagement(
    @Body() menuPermissionManagement: MenuPermissionManagement,
  ): Promise<ResponseData<MenuPermissionManagement>> {
    try {
      const data =
        await this.menuPermissionManagementService.updateMenuPermissionManagement(
          menuPermissionManagement,
        );
      return new ResponseData<MenuPermissionManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MenuPermissionManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createMenuPermissionManagement(
    @Body() menuPermissionManagementDto: MenuPermissionManagementDto,
  ): Promise<ResponseData<MenuPermissionManagement>> {
    try {
      const data =
        await this.menuPermissionManagementService.createMenuPermissionManagement(
          menuPermissionManagementDto,
        );
      return new ResponseData<MenuPermissionManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MenuPermissionManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete()
  async deleteMenuPermissionManagement(
    @Body('_id') _id: number,
  ): Promise<ResponseData<any>> {
    try {
      const data =
        await this.menuPermissionManagementService.deleteMenuPermissionManagementById(
          _id,
        );
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
