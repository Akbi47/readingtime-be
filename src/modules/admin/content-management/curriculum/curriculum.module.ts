import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from './curriculum.controller';
import { CurriculumSchema } from '../../../../schemas/admin/content-management/curriculum.schema';
import { CurriculumService } from './curriculum.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Curriculum',
        schema: CurriculumSchema,
      },
    ]),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
