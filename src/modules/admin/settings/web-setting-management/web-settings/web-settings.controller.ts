import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { WebSettings } from './interface/web-settings.interface';
import { WebSettingsService } from './web-settings.service';

@Controller('web-settings')
export class WebSettingsController {
  constructor(private readonly webSettingsService: WebSettingsService) {}

  @Get()
  async getWebSettings(): Promise<ResponseData<WebSettings[]>> {
    try {
      const data = await this.webSettingsService.getWebSettings();
      return new ResponseData<WebSettings[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<WebSettings[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateWebSettings(
    @Body() webSettings: WebSettings,
  ): Promise<ResponseData<WebSettings>> {
    try {
      const data = await this.webSettingsService.updateWebSettings(webSettings);
      return new ResponseData<WebSettings>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<WebSettings>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
