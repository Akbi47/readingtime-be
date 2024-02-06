import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegularProductController } from './regular-product.controller';
import { RegularProductService } from './regular-product.service';
import {
  RegularProduct,
  RegularProductSchema,
} from './schemas/regular-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RegularProduct.name,
        schema: RegularProductSchema,
      },
    ]),
  ],
  controllers: [RegularProductController],
  providers: [RegularProductService],
  exports: [RegularProductService],
})
export class RegularProductModule {}
