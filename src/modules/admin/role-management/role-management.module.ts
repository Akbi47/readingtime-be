import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { RoleManagementController } from './role-management.controller';
import { RoleManagementService } from './role-management.service';
import { AccountUserModule } from '../user-management/account-user/account-user.module';
import {
  RoleManagement,
  RoleManagementSchema,
} from './schemas/role-management.schema';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: RoleManagement.name,
        useFactory: async () => {
          const schema = RoleManagementSchema;
          schema.plugin(AutoIncrementID, {
            field: 'ID',
            startAt: 1,
          } satisfies AutoIncrementIDOptions);
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    AccountUserModule,
    MailModule,
  ],
  controllers: [RoleManagementController],
  providers: [RoleManagementService],
})
export class RoleManagementModule {}
