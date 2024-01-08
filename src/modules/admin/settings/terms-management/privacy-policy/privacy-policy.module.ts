import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivacyPolicyController } from './privacy-policy.controller';
import { PrivacyPolicySchema } from '../../../../../schemas/admin/settings/terms-management/privacy-policy.schema';
import { PrivacyPolicyService } from './privacy-policy.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PrivacyPolicy', schema: PrivacyPolicySchema },
    ]),
  ],
  controllers: [PrivacyPolicyController],
  providers: [PrivacyPolicyService],
})
export class PrivacyPolicyModule {}
