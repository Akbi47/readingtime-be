import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { AccountUserController } from './account-user.controller';
import { AccountUserService } from './account-user.service';
import { AccountUser, AccountUserSchema } from './schemas/account-user.schema';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: AccountUser.name,
        useFactory: async () => {
          const schema = AccountUserSchema;
          schema.plugin(AutoIncrementID, {
            field: 'ID',
            startAt: 1,
          } satisfies AutoIncrementIDOptions);
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    MailModule,
  ],
  providers: [AccountUserService],
  controllers: [AccountUserController],
  exports: [AccountUserService],
})
export class AccountUserModule {}
