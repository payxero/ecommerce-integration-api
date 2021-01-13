import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/charge')
  async paymentCharge(@Body() chargeDto: any): Promise<any> {
    return await this.appService.paymentCharge(chargeDto);
  }

}
