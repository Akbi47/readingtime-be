import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacationResignationManagementController } from './vacation-resignation-management.controller';
import { VacationResignationManagementSchema } from '../../../../schemas/admin/teacher-management/vacation-resignation-management.schema';
import { VacationResignationManagementService } from './vacation-resignation-management.service';
import { VacationResignationManagement } from './schemas/vacation-resignation-management.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VacationResignationManagement.name,
        schema: VacationResignationManagementSchema,
      },
    ]),
  ],
  controllers: [VacationResignationManagementController],
  providers: [VacationResignationManagementService],
})
export class VacationResignationManagementModule {}
