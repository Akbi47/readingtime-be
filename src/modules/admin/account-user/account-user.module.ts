import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountUserController } from './account-user.controller';
import { AccountUserSchema } from '../../../schemas/admin/account-user.schema';
import { AccountUserService } from './account-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccountUser', schema: AccountUserSchema },
    ]),
  ],
  controllers: [AccountUserController],
  providers: [AccountUserService],
})
export class AccountUserModule {}
