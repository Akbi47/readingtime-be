import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleManagementController } from './role-management.controller';
import { RoleManagementSchema } from '../../../schemas/admin/role-management.schema';
import { RoleManagementService } from './role-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RoleManagement',
        schema: RoleManagementSchema,
      },
    ]),
  ],
  controllers: [RoleManagementController],
  providers: [RoleManagementService],
})
export class RoleManagementModule {}
