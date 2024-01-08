import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidayManagementController } from './holiday-management.controller';
import { HolidayManagementSchema } from '../../../../../schemas/admin/settings/web-setting-management/holiday-management.schema';
import { HolidayManagementService } from './holiday-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HolidayManagement', schema: HolidayManagementSchema },
    ]),
  ],
  controllers: [HolidayManagementController],
  providers: [HolidayManagementService],
})
export class HolidayManagementModule {}
