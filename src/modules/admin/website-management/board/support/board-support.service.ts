import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardSupport } from './interface/board-support.interface';
import { BoardSupportDto } from './dto/board-support.dto';

@Injectable()
export class BoardSupportService {
  constructor(
    @InjectModel('BoardSupport')
    private readonly boardSupportModel: Model<BoardSupport>,
  ) {}

  async getBoardSupport(): Promise<BoardSupport[]> {
    return this.boardSupportModel.find().exec();
  }

  async getBoardSupportById(_id: string): Promise<BoardSupport> {
    return this.boardSupportModel.findById(_id).exec();
  }

  async createBoardSupport(
    boardSupportDto: BoardSupportDto,
  ): Promise<BoardSupport> {
    const createdBoardSupport = new this.boardSupportModel(boardSupportDto);
    return createdBoardSupport.save();
  }

  async updateBoardSupport(boardSupport: BoardSupport): Promise<BoardSupport> {
    const { _id, ...updatedData } = boardSupport;
    return this.boardSupportModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
