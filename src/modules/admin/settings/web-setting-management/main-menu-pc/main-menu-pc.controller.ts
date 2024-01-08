import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MainMenuPC } from './interface/main-menu-pc.interface';
import { MainMenuPCService } from './main-menu-pc.service';

@Controller('main-menu-pc')
export class MainMenuPCController {
  constructor(private readonly mainMenuPCService: MainMenuPCService) {}

  @Get()
  async getMainMenuPC(): Promise<ResponseData<MainMenuPC[]>> {
    try {
      const data = await this.mainMenuPCService.getMainMenuPC();
      return new ResponseData<MainMenuPC[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<MainMenuPC[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
