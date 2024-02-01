import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CouponService } from './coupon.service';
import { CouponDto } from './dto/coupon.dto';
import { Coupon, CouponDocument } from './schemas/coupon.schema';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async getCoupon(): Promise<ResponseData<Coupon[]>> {
    try {
      const data = await this.couponService.getCoupon();
      return new ResponseData<Coupon[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Coupon[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createCoupon(
    @Body() couponDto: CouponDto,
  ): Promise<ResponseData<Coupon>> {
    try {
      const data = await this.couponService.createCoupon(couponDto);
      return new ResponseData<Coupon>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Coupon>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getCouponById(@Body() body: { _id: string }): Promise<Coupon> {
    const { _id } = body;
    return this.couponService.getCouponById(_id);
  }

  @Put()
  async updateCoupon(@Body() coupon: CouponDocument): Promise<void> {
    await new ResponseData<Coupon>(
      coupon,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }
}
