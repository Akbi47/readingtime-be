import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { PaymentAndRefundPolicy } from './interface/payment-and-refund-policy.interface';
import { PaymentAndRefundPolicyService } from './payment-and-refund-policy.service';

@Controller('payment-and-refund-policy')
export class PaymentAndRefundPolicyController {
  constructor(
    private readonly paymentAndRefundPolicyService: PaymentAndRefundPolicyService,
  ) {}

  @Get()
  async getPaymentAndRefundPolicy(): Promise<
    ResponseData<PaymentAndRefundPolicy[]>
  > {
    try {
      const data =
        await this.paymentAndRefundPolicyService.getPaymentAndRefundPolicy();
      return new ResponseData<PaymentAndRefundPolicy[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PaymentAndRefundPolicy[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updatePaymentAndRefundPolicy(
    @Body() PaymentAndRefundPolicy: PaymentAndRefundPolicy,
  ): Promise<ResponseData<PaymentAndRefundPolicy>> {
    try {
      const data =
        await this.paymentAndRefundPolicyService.updatePaymentAndRefundPolicy(
          PaymentAndRefundPolicy,
        );
      return new ResponseData<PaymentAndRefundPolicy>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PaymentAndRefundPolicy>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
