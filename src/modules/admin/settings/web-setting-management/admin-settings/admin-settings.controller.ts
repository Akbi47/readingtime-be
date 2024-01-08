import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AdminSettings } from './interface/admin-settings.interface';
import { AdminSettingsService } from './admin-settings.service';

@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Get()
  async getAdminSettings(): Promise<ResponseData<AdminSettings[]>> {
    try {
      const data = await this.adminSettingsService.getAdminSettings();
      return new ResponseData<AdminSettings[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AdminSettings[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateAdminSettings(
    @Body() adminSettings: AdminSettings,
  ): Promise<ResponseData<AdminSettings>> {
    try {
      const data =
        await this.adminSettingsService.updateAdminSettings(adminSettings);
      return new ResponseData<AdminSettings>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AdminSettings>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
