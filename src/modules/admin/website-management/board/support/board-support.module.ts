import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSupportSupportController } from './board-support.controller';
import { BoardSupportSchema } from '../../../../../schemas/admin/website-management/board/board-support.schema';
import { BoardSupportService } from './board-support.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BoardSupport',
        schema: BoardSupportSchema,
      },
    ]),
  ],
  controllers: [BoardSupportSupportController],
  providers: [BoardSupportService],
})
export class BoardSupportModule {}
