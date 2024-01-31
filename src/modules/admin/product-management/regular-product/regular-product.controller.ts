import { Controller, Get, Body, Post, Put, Query } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { RegularProductService } from './regular-product.service';
import {
  RegularProduct,
  RegularProductDocument,
} from './schemas/regular-product.schema';
import GetRegularProductDto from './dto/get-regular-product.dto';
import CreateRegularProductDto from './dto/create-regular-product.dto';

@Controller('regular-product')
export class RegularProductController {
  constructor(private readonly regularProductService: RegularProductService) {}

  @Get('/')
  async getRegularProduct(
    @Query() getRegularProductDto: GetRegularProductDto,
  ): Promise<ResponseData<RegularProduct[]>> {
    try {
      const data =
        await this.regularProductService.getRegularProduct(
          getRegularProductDto,
        );
      return new ResponseData<RegularProduct[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<RegularProduct[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createRegularProduct(
    @Body() regularProductDto: CreateRegularProductDto,
  ): Promise<ResponseData<RegularProduct>> {
    try {
      const data =
        await this.regularProductService.createRegularProduct(
          regularProductDto,
        );
      return new ResponseData<RegularProduct>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<RegularProduct>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getRegularProductById(
    @Body() body: { _id: string },
  ): Promise<RegularProduct> {
    const { _id } = body;
    return this.regularProductService.getRegularProductById(_id);
  }

  @Put()
  async updateRegularProduct(
    @Body() freeTrialProduct: RegularProductDocument,
  ): Promise<void> {
    await this.regularProductService.updateRegularProduct(freeTrialProduct);
  }
}
