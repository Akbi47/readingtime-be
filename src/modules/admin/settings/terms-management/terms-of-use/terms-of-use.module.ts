import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TermsOfUseController } from './terms-of-use.controller';
import { TermsOfUseSchema } from '../../../../../schemas/admin/settings/terms-management/terms-of-use.schema';
import { TermsOfUseService } from './terms-of-use.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TermsOfUse', schema: TermsOfUseSchema },
    ]),
  ],
  controllers: [TermsOfUseController],
  providers: [TermsOfUseService],
})
export class TermsOfUseModule {}
