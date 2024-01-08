import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CustomerServiceMobile } from './interface/customer-service-mobile.interface';
import { CustomerServiceMobileService } from './customer-service-mobile.service';

@Controller('customer-service-mobile')
export class CustomerServiceMobileController {
  constructor(
    private readonly customerServiceMobileService: CustomerServiceMobileService,
  ) {}

  @Get()
  async getCustomerServiceMobile(): Promise<
    ResponseData<CustomerServiceMobile[]>
  > {
    try {
      const data =
        await this.customerServiceMobileService.getCustomerServiceMobile();
      return new ResponseData<CustomerServiceMobile[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CustomerServiceMobile[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
