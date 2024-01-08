import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SMTPSecuritySchema } from 'src/schemas/admin/settings/web-setting-management/smtp-security.schema';
import { SMTPSecurityController } from './smtp-security.controller';
import { SMTPSecurityService } from './smtp-security.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SMTPSecurity', schema: SMTPSecuritySchema },
    ]),
  ],
  controllers: [SMTPSecurityController],
  providers: [SMTPSecurityService],
})
export class SMTPSecurityModule {}
