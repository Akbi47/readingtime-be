import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MainPageProductMobileService } from './main-page-product-mobile.service';
import { MainPageProductMobile } from './interface/main-page-product-mobile.interface';

@Controller('main-page-product-mobile')
export class MainPageProductMobileController {
  constructor(
    private readonly mainPageProductMobileService: MainPageProductMobileService,
  ) {}

  @Get()
  async getMainPageProductMobile(): Promise<
    ResponseData<MainPageProductMobile[]>
  > {
    try {
      const data =
        await this.mainPageProductMobileService.getMainPageProductMobile();
      return new ResponseData<MainPageProductMobile[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MainPageProductMobile[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
