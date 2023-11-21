import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import * as base64 from 'base-64';

@Injectable()
export class AppService {
  url: string;
  username: string;
  password: string;
  hash: string;
  payment: any;

  constructor(private readonly http: HttpService) {
    this.url = 'https://api.paywithzero.net/v1/public/payment';
    this.username = 'integration@strictlyzero.com';
    this.password = 'jN!&9rd2rfqzUKAWsp8FYj';
    this.hash = 'QRZQG3J6QMQ6D44HDG7F';
  }

  async paymentCharge(charge: any): Promise<any> {
    // This is comming from our javascript integration sample application
    if (charge.jsonDataInput) {
      charge = JSON.parse(charge.jsonDataInput);
    }

    const dataSend = {
      "amount": charge.amount,
      "contact": charge.contact,
      "billingAddress": charge.billingAddress,
      "shippingAddress": charge.shippingAddress,
      "order": charge.order,
      "capture": true,
      "card": {
        "name": charge.card.name,
        "number": charge.card.number,
        "paymentToken": charge.card.paymentToken
      },
      "sendReceipt": true
    }
    const basicAuth = `Basic ${base64.encode(
      `${this.username}:${this.password}`,
    )}`;
    const options: AxiosRequestConfig = {
      headers: {
        authorization: basicAuth,
        'key-hash': this.hash,
      },
    };

    try {
      const { data } = await this.http
        .post(`${this.url}/charge`, dataSend, options)
        .toPromise();

      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error);
    }
  }


  async paymentRate(rate: any): Promise<any> {
    // This is comming from our javascript integration sample application
    if (rate.jsonDataInput) {
      rate = JSON.parse(rate.jsonDataInput);
    }

    const basicAuth = `Basic ${base64.encode(
      `${this.username}:${this.password}`,
    )}`;
    const options: AxiosRequestConfig = {
      headers: {
        authorization: basicAuth,
        'key-hash': this.hash,
      },
      params: {
        ...rate
      }
    };

    try {
      const { data } = await this.http
        .get(`${this.url}/rate`, options)
        .toPromise();

      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error);
    }
  }

  // This will only be called if the external payment api is being run locally and have webhooks paths pointing to this local service
  webhook(payment): Observable<any> {
    this.payment = payment;
    throw new HttpException('Succses webhook call', 200);
  }
}
