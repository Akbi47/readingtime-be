import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuPermissionManagementController } from './menu-permission-management.controller';
import { MenuPermissionManagementSchema } from '../../../../../schemas/admin/settings/web-setting-management/menu-permission-management.schema';
import { MenuPermissionManagementService } from './menu-permission-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MenuPermissionManagement',
        schema: MenuPermissionManagementSchema,
      },
    ]),
  ],
  controllers: [MenuPermissionManagementController],
  providers: [MenuPermissionManagementService],
})
export class MenuPermissionManagementModule {}
