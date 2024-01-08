import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreeTrialProductController } from './free-trial-product.controller';
import { FreeTrialProductSchema } from '../../../../schemas/admin/product-management/free-trial-product.schema';
import { FreeTrialProductService } from './free-trial-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'FreeTrialProduct',
        schema: FreeTrialProductSchema,
      },
    ]),
  ],
  controllers: [FreeTrialProductController],
  providers: [FreeTrialProductService],
})
export class FreeTrialProductModule {}
