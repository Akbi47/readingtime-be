import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MainMenuMobile } from './interface/main-menu-mobile.interface';
import { MainMenuMobileService } from './main-menu-mobile.service';

@Controller('main-menu-mobile')
export class MainMenuMobileController {
  constructor(private readonly mainMenuPCService: MainMenuMobileService) {}

  @Get()
  async getMainMenuPC(): Promise<ResponseData<MainMenuMobile[]>> {
    try {
      const data = await this.mainMenuPCService.getMainMenuMobile();
      return new ResponseData<MainMenuMobile[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MainMenuMobile[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
