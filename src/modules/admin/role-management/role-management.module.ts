import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleManagementController } from './role-management.controller';
import { RoleManagementSchema } from '../../../schemas/admin/role-management.schema';
import { RoleManagementService } from './role-management.service';
import { AccountUserModule } from '../user-management/account-user/account-user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RoleManagement',
        schema: RoleManagementSchema,
      },
    ]),
    AccountUserModule,
  ],
  controllers: [RoleManagementController],
  providers: [RoleManagementService],
})
export class RoleManagementModule {}
