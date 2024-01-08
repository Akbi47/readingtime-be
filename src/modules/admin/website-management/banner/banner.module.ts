import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerController } from './banner.controller';
import { BannerSchema } from '../../../../schemas/admin/website-management/banner.schema';
import { BannerService } from './banner.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Banner',
        schema: BannerSchema,
      },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
