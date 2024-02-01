import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CouponDto } from './dto/coupon.dto';
import { Coupon, CouponDocument } from './schemas/coupon.schema';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel('Coupon')
    private readonly couponModel: Model<Coupon>,
  ) {}

  async getCoupon(): Promise<Coupon[]> {
    return this.couponModel.find();
  }

  async getCouponById(_id: string): Promise<Coupon> {
    return this.couponModel.findById(_id).exec();
  }

  async createCoupon(couponDto: CouponDto): Promise<Coupon> {
    const createdCoupon = await this.couponModel.create(couponDto);
    return createdCoupon;
  }

  async updateCoupon(coupon: CouponDocument): Promise<void> {
    const { _id, ...updatedData } = coupon;
    await this.couponModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
