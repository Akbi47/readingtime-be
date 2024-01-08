import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { PaymentManagement } from './interface/payment-management.interface';
import { PaymentManagementService } from './payment-management.service';
import { PaymentManagementDto } from './dto/payment-management.dto';

@Controller('payment-management')
export class PaymentManagementController {
  constructor(
    private readonly paymentManagementService: PaymentManagementService,
  ) {}

  @Get()
  async getPaymentManagement(): Promise<ResponseData<PaymentManagement[]>> {
    try {
      const data = await this.paymentManagementService.getPaymentManagement();
      return new ResponseData<PaymentManagement[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PaymentManagement[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createPaymentManagement(
    @Body() paymentManagementDto: PaymentManagementDto,
  ): Promise<ResponseData<PaymentManagement>> {
    try {
      const data =
        await this.paymentManagementService.createPaymentManagement(
          paymentManagementDto,
        );
      return new ResponseData<PaymentManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PaymentManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getPaymentManagementById(
    @Body() body: { _id: string },
  ): Promise<PaymentManagement> {
    const { _id } = body;
    return this.paymentManagementService.getPaymentManagementById(_id);
  }

  @Put()
  async handlePayment(
    @Body() paymentManagement: PaymentManagement,
  ): Promise<ResponseData<PaymentManagement>> {
    try {
      const data =
        await this.paymentManagementService.handlePayment(paymentManagement);
      return new ResponseData<PaymentManagement>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PaymentManagement>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
