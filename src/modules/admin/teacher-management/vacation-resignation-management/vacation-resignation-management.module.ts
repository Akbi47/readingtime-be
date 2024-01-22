import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacationResignationManagementController } from './vacation-resignation-management.controller';
import { VacationResignationManagementSchema } from '../../../../schemas/admin/teacher-management/vacation-resignation-management.schema';
import { VacationResignationManagementService } from './vacation-resignation-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'VacationResignationManagement',
        schema: VacationResignationManagementSchema,
      },
    ]),
  ],
  controllers: [VacationResignationManagementController],
  providers: [VacationResignationManagementService],
})
export class VacationResignationManagementModule {}
