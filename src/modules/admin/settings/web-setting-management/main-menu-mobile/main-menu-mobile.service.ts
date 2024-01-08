import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainMenuMobile } from './interface/main-menu-mobile.interface';

@Injectable()
export class MainMenuMobileService {
  constructor(
    @InjectModel('MainMenuMobile')
    private readonly mainMenuMobileModel: Model<MainMenuMobile>,
  ) {}

  async getMainMenuMobile(): Promise<MainMenuMobile[]> {
    return this.mainMenuMobileModel.find().exec();
  }
}
