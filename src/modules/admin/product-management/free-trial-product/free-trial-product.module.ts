import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreeTrialProductController } from './free-trial-product.controller';
import { FreeTrialProductService } from './free-trial-product.service';
import {
  TrialProduct,
  TrialProductSchema,
} from './schemas/trial-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrialProduct.name,
        schema: TrialProductSchema,
      },
    ]),
  ],
  controllers: [FreeTrialProductController],
  providers: [FreeTrialProductService],
  exports: [FreeTrialProductService],
})
export class FreeTrialProductModule {}
