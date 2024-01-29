import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CurriculumService } from './curriculum.service';
import { Curriculum, CurriculumDocument } from './schemas/curriculum.schema';
import CreateCurriculumDto from './dto/create-curriculum.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  async getCurriculum(): Promise<ResponseData<Curriculum[]>> {
    try {
      const data = await this.curriculumService.getCurriculum();
      return new ResponseData<Curriculum[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Curriculum[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createCurriculum(
    @Body() curriculumDto: CreateCurriculumDto,
  ): Promise<ResponseData<Curriculum>> {
    try {
      const data = await this.curriculumService.createCurriculum(curriculumDto);
      return new ResponseData<Curriculum>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Curriculum>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getCurriculumById(@Body() body: { _id: string }): Promise<Curriculum> {
    const { _id } = body;
    return this.curriculumService.getCurriculumById(_id);
  }

  @Put()
  async updateCurriculum(
    @Body() curriculum: CurriculumDocument,
  ): Promise<void> {
    await this.curriculumService.updateCurriculum(curriculum);
  }
}
