import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionTermsAndConditionsController } from './promotion-terms-and-conditions.controller';
import { PromotionTermsAndConditionsSchema } from '../../../../../schemas/admin/settings/terms-management/promotion-tems-and-conditions.schema';
import { PromotionTermsAndConditionsService } from './promotion-terms-and-conditions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'PromotionTermsAndConditions',
        schema: PromotionTermsAndConditionsSchema,
      },
    ]),
  ],
  controllers: [PromotionTermsAndConditionsController],
  providers: [PromotionTermsAndConditionsService],
})
export class PromotionTermsAndConditionsModule {}
