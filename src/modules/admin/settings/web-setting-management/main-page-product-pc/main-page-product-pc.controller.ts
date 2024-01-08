import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MainPageProductPCService } from './main-page-product-pc.service';
import { MainPageProductPC } from './interface/main-page-product-pc.interface';

@Controller('main-page-product-pc')
export class MainPageProductPCController {
  constructor(
    private readonly mainPageProductPCService: MainPageProductPCService,
  ) {}

  @Get()
  async getMainPageProductPC(): Promise<ResponseData<MainPageProductPC[]>> {
    try {
      const data = await this.mainPageProductPCService.getMainPageProductPC();
      return new ResponseData<MainPageProductPC[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MainPageProductPC[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
