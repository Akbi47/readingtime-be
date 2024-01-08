import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { RegularProduct } from './interface/regular-product.interface';
import { RegularProductService } from './regular-product.service';
import { RegularProductDto } from './dto/regular-product.dto';

@Controller('regular-product')
export class RegularProductController {
  constructor(private readonly regularProductService: RegularProductService) {}

  @Get()
  async getRegularProduct(): Promise<ResponseData<RegularProduct[]>> {
    try {
      const data = await this.regularProductService.getRegularProduct();
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

  @Post()
  async createRegularProduct(
    @Body() regularProductDto: RegularProductDto,
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
    @Body() regularProduct: RegularProduct,
  ): Promise<ResponseData<RegularProduct>> {
    try {
      const data =
        await this.regularProductService.updateRegularProduct(regularProduct);
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
}
