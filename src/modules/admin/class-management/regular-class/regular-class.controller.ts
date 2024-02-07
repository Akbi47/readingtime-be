import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { RegularClassService } from './regular-class.service';
import { ResponseData } from 'src/global/globalClass';
import {
  RegularClass,
  RegularClassDocument,
} from './schemas/regular-class.schema';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CreateRegularClassDto } from './dto/create-regular-class.schema';

@Controller('regular-class')
export class RegularClassController {
  constructor(private readonly regularClassService: RegularClassService) {}

  @Get('/')
  async getRegularClass(): Promise<ResponseData<RegularClass[]>> {
    try {
      const data = await this.regularClassService.getRegularClass();
      return new ResponseData<RegularClass[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<RegularClass[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createRegularProduct(
    @Body() regularProductDto: CreateRegularClassDto,
  ): Promise<ResponseData<RegularClass>> {
    try {
      const data =
        await this.regularClassService.createRegularClass(regularProductDto);
      return new ResponseData<RegularClass>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<RegularClass>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Get('get-detail')
  // async getRegularProductById(
  //   @Body() body: { _id: string },
  // ): Promise<RegularProduct> {
  //   const { _id } = body;
  //   return this.regularProductService.getRegularProductById(_id);
  // }

  @Put()
  async updateRegularClass(
    @Body() freeTrialProduct: RegularClassDocument,
  ): Promise<void> {
    await this.regularClassService.updateRegularClass(freeTrialProduct);
  }
}
