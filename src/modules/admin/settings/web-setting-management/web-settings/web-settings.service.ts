import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebSettings } from './interface/web-settings.interface';

@Injectable()
export class WebSettingsService {
  constructor(
    @InjectModel('WebSettings')
    private readonly webSettingsModel: Model<WebSettings>,
  ) {}

  async getWebSettings(): Promise<WebSettings[]> {
    return this.webSettingsModel.find().exec();
  }

  async updateWebSettings(webSettings: WebSettings): Promise<WebSettings> {
    const { Id, ...updatedData } = webSettings;
    return this.webSettingsModel
      .findOneAndUpdate({ Id }, updatedData, { new: true })
      .exec();
  }
}
