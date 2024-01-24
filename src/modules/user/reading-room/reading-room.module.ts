import { Module } from '@nestjs/common';
import { ReadingRoomService } from './reading-room.service';
import { ReadingRoomController } from './reading-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingRoom, ReadingRoomSchema } from './schemas/reading-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadingRoom.name, schema: ReadingRoomSchema },
    ]),
  ],
  providers: [ReadingRoomService],
  exports: [ReadingRoomService],
  controllers: [ReadingRoomController]
})
export class ReadingRoomModule {}
