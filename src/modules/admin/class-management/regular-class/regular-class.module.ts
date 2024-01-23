import { Module } from '@nestjs/common';
import { RegularClassService } from './regular-class.service';
import { RegularClassController } from './regular-class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RegularClass,
  RegularClassSchema,
} from './schemas/regular-class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RegularClass.name, schema: RegularClassSchema },
    ]),
  ],
  providers: [RegularClassService],
  controllers: [RegularClassController],
  exports: [RegularClassService],
})
export class RegularClassModule {}
