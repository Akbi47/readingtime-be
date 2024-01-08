import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './interface/banner.interface';
import { BannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel('Banner')
    private readonly bannerModel: Model<Banner>,
  ) {}

  async getBanner(): Promise<Banner[]> {
    return this.bannerModel.find().exec();
  }

  async getBannerById(_id: string): Promise<Banner> {
    return this.bannerModel.findById(_id).exec();
  }

  async createBanner(bannerDto: BannerDto): Promise<Banner> {
    const createdBanner = new this.bannerModel(bannerDto);
    return createdBanner.save();
  }

  async updateBanner(banner: Banner): Promise<Banner> {
    const { _id, ...updatedData } = banner;
    return this.bannerModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
