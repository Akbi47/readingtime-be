import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { DoSpacesServiceProvider } from './config';

@Module({
  controllers: [SpaceController],
  providers: [DoSpacesServiceProvider, SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
