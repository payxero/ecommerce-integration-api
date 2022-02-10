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
    this.url = 'https://api.paywithzero.net/v1/public/payment/charge';
    this.username = 'support@zerosurcharging.com';
    this.password = '@Prospay123';
    this.hash = 'CBJPES59WLFCYP3X2RAG';
  }

  async paymentCharge(charge: any): Promise<any> {
    // This is comming from our javascript integration sample application
    if (charge.jsonDataInput) {
      charge = JSON.parse(charge.jsonDataInput);
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
        .post(this.url, charge, options)
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
