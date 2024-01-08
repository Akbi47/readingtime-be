import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CustomerServicePC } from './interface/customer-service-pc.interface';
import { CustomerServicePCService } from './customer-service-pc.service';

@Controller('customer-service-pc')
export class CustomerServicePCController {
  constructor(
    private readonly customerServicePCService: CustomerServicePCService,
  ) {}

  @Get()
  async getCustomerServicePC(): Promise<ResponseData<CustomerServicePC[]>> {
    try {
      const data = await this.customerServicePCService.getCustomerServicePC();
      return new ResponseData<CustomerServicePC[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CustomerServicePC[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
