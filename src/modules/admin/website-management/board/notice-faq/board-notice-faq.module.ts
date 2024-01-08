import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardNoticeFAQNoticeFAQController } from './board-notice-faq.controller';
import { BoardNoticeFAQSchema } from '../../../../../schemas/admin/website-management/board/board-notice-faq.schema';
import { BoardNoticeFAQService } from './board-notice-faq.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BoardNoticeFAQ',
        schema: BoardNoticeFAQSchema,
      },
    ]),
  ],
  controllers: [BoardNoticeFAQNoticeFAQController],
  providers: [BoardNoticeFAQService],
})
export class BoardNoticeFAQModule {}
