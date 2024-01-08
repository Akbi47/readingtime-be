import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainMenuPC } from './interface/main-menu-pc.interface';

@Injectable()
export class MainMenuPCService {
  constructor(
    @InjectModel('MainMenuPC')
    private readonly mainMenuPCModel: Model<MainMenuPC>,
  ) {}

  async getMainMenuPC(): Promise<MainMenuPC[]> {
    return this.mainMenuPCModel.find().exec();
  }
}
