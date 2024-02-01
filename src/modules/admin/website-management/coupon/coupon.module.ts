import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponController } from './coupon.controller';
import { CouponSchema } from '../../../../schemas/admin/website-management/coupon.schema';
import { CouponService } from './coupon.service';
import { Coupon } from './schemas/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coupon.name,
        schema: CouponSchema,
      },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
