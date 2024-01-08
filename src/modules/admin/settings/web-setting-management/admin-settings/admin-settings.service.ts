import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminSettings } from './interface/admin-settings.interface';

@Injectable()
export class AdminSettingsService {
  constructor(
    @InjectModel('AdminSettings')
    private readonly adminSettingsModel: Model<AdminSettings>,
  ) {}

  async getAdminSettings(): Promise<AdminSettings[]> {
    return this.adminSettingsModel.find().exec();
  }

  async updateAdminSettings(
    adminSettings: AdminSettings,
  ): Promise<AdminSettings> {
    const { Id, ...updatedData } = adminSettings;
    return this.adminSettingsModel
      .findOneAndUpdate({ Id }, updatedData, { new: true })
      .exec();
  }
}
