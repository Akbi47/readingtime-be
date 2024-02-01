import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';
import { Banner } from './schemas/banner.schema';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getBanner(): Promise<ResponseData<Banner[]>> {
    try {
      const data = await this.bannerService.getBanner();
      return new ResponseData<Banner[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Banner[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createBanner(
    @Body() bannerDto: BannerDto,
  ): Promise<ResponseData<Banner>> {
    try {
      const data = await this.bannerService.createBanner(bannerDto);
      return new ResponseData<Banner>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Banner>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getBannerById(@Body() body: { _id: string }): Promise<Banner> {
    const { _id } = body;
    return this.bannerService.getBannerById(_id);
  }

  // @Put()
  // async updateBanner(@Body() banner: Banner): Promise<ResponseData<Banner>> {
  //   try {
  //     const data = await this.bannerService.updateBanner(banner);
  //     return new ResponseData<Banner>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (error) {
  //     return new ResponseData<Banner>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }
}
