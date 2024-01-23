import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ReadingRoom,
  ReadingRoomDocument,
} from './schemas/reading-room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IdDto } from 'src/shares/dtos/param.dto';

@Injectable()
export class ReadingRoomService {
  constructor(
    @InjectModel(ReadingRoom.name)
    private readonly readingRoomModel: Model<ReadingRoomDocument>,
  ) {}
  async createData(data: any) {
    return await this.readingRoomModel.create(data);
  }
  async getReadingRoomOfUser(idDto: IdDto): Promise<ReadingRoom[]> {
    const { id } = idDto;
    const data = await this.readingRoomModel.findOne({ student_id: id });
    console.log({ data });
    return await this.readingRoomModel.findOne({ student_id: id });
  }
}
