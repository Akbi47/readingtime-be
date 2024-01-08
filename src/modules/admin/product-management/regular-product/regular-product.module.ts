import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegularProductController } from './regular-product.controller';
import { RegularProductSchema } from '../../../../schemas/admin/product-management/regular-product.schema';
import { RegularProductService } from './regular-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RegularProduct',
        schema: RegularProductSchema,
      },
    ]),
  ],
  controllers: [RegularProductController],
  providers: [RegularProductService],
})
export class RegularProductModule {}
