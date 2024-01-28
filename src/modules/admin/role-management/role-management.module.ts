import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleManagementController } from './role-management.controller';
import { RoleManagementService } from './role-management.service';
import { AccountUserModule } from '../user-management/account-user/account-user.module';
import {
  RoleManagement,
  RoleManagementSchema,
} from './schemas/role-management.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoleManagement.name,
        schema: RoleManagementSchema,
      },
    ]),
    AccountUserModule,
  ],
  controllers: [RoleManagementController],
  providers: [RoleManagementService],
})
export class RoleManagementModule {}
