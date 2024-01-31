import { Module } from '@nestjs/common';
import { TrialClassService } from './trial-class.service';
import { TrialClassController } from './trial-class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrialClass, TrialClassSchema } from './schemas/trial-class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrialClass.name, schema: TrialClassSchema },
    ]),
  ],
  providers: [TrialClassService],
  controllers: [TrialClassController],
  exports: [TrialClassService],
})
export class TrialClassModule {}
