import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/charge')
  async paymentCharge(@Body() chargeDto: any): Promise<any> {
    return await this.appService.paymentCharge(chargeDto);
  }

  @Post('/charge-webhook')
  async chargeCallWebook(@Body() paymentDto: any): Promise<any> {
    return await this.appService.webhook(paymentDto);
  }

  @Post('/void-webhook')
  async voidCallWebook(@Body() paymentDto: any): Promise<any> {
    return await this.appService.webhook(paymentDto);
  }

  @Post('/refund-webhook')
  async refundCallWebook(@Body() paymentDto: any): Promise<any> {
    return await this.appService.webhook(paymentDto);
  }

}
