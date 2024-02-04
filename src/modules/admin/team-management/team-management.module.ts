import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountUserModule } from '../user-management/account-user/account-user.module';

import { MailModule } from 'src/modules/mail/mail.module';
import {
  TeamManagement,
  TeamManagementSchema,
} from './schemas/team-management.schema';
import { TeamManagementController } from './team-management.controller';
import { TeamManagementService } from './team-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamManagement.name, schema: TeamManagementSchema },
    ]),
    AccountUserModule,
    MailModule,
    AccountUserModule,
  ],
  controllers: [TeamManagementController],
  providers: [TeamManagementService],
  exports: [TeamManagementService],
})
export class TeamManagementModule {}
