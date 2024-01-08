import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuPermissionManagement } from './interface/menu-permission-management.interface';
import { MenuPermissionManagementDto } from './dto/menu-permission-management.dto';

@Injectable()
export class MenuPermissionManagementService {
  constructor(
    @InjectModel('MenuPermissionManagement')
    private readonly menuPermissionManagementModel: Model<MenuPermissionManagement>,
  ) {}

  async getMenuPermissionManagement(): Promise<MenuPermissionManagement[]> {
    return this.menuPermissionManagementModel.find().exec();
  }

  async updateMenuPermissionManagement(
    menuPermissionManagement: MenuPermissionManagement,
  ): Promise<MenuPermissionManagement> {
    const { _id, ...updatedData } = menuPermissionManagement;
    return this.menuPermissionManagementModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }

  async createMenuPermissionManagement(
    menuPermissionManagementDto: MenuPermissionManagementDto,
  ): Promise<MenuPermissionManagement> {
    const createdMenuPermissionManagement =
      new this.menuPermissionManagementModel(menuPermissionManagementDto);
    return createdMenuPermissionManagement.save();
  }

  async deleteMenuPermissionManagementById(_id: number): Promise<any> {
    return this.menuPermissionManagementModel.deleteOne({ _id: _id }).exec();
  }
}
