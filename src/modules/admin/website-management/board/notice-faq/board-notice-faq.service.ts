import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardNoticeFAQ } from './interface/board-notice-faq.interface';
import { BoardNoticeFAQDto } from './dto/board-notice-faq.dto';

@Injectable()
export class BoardNoticeFAQService {
  constructor(
    @InjectModel('BoardNoticeFAQ')
    private readonly boardNoticeFAQModel: Model<BoardNoticeFAQ>,
  ) {}

  async getBoardNoticeFAQ(): Promise<BoardNoticeFAQ[]> {
    return this.boardNoticeFAQModel.find().exec();
  }

  async getBoardNoticeFAQById(_id: string): Promise<BoardNoticeFAQ> {
    return this.boardNoticeFAQModel.findById(_id).exec();
  }

  async createBoardNoticeFAQ(
    boardNoticeFAQDto: BoardNoticeFAQDto,
  ): Promise<BoardNoticeFAQ> {
    const createdBoardNoticeFAQ = new this.boardNoticeFAQModel(
      boardNoticeFAQDto,
    );
    return createdBoardNoticeFAQ.save();
  }

  async updateBoardNoticeFAQ(
    boardNoticeFAQ: BoardNoticeFAQ,
  ): Promise<BoardNoticeFAQ> {
    const { _id, ...updatedData } = boardNoticeFAQ;
    return this.boardNoticeFAQModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
