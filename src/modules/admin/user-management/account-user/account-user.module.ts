import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountUserController } from './account-user.controller';
import { AccountUserService } from './account-user.service';
import { AccountUser, AccountUserSchema } from './schemas/account-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountUser.name, schema: AccountUserSchema },
    ]),
  ],
  providers: [AccountUserService],
  controllers: [AccountUserController],
  exports: [AccountUserService],
})
export class AccountUserModule {}
