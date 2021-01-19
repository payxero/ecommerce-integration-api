import { Injectable, HttpService, HttpException } from '@nestjs/common';

import { map } from 'rxjs/operators';
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
        this.url = 'https://api.paywithzero.net/v1/payment/api/charge';
        this.username = 'support@zerosurcharging.com';
        this.password = 'demo123';
        this.hash = 'CBJPES59WLFCYP3X2RAG';
    }

    paymentCharge(charge: any): Observable<any> {
        const basicAuth = `Basic ${base64.encode(`${this.username}:${this.password}`)}`;
        const options: AxiosRequestConfig = {
            headers: {
                authorization: basicAuth,
                'key-hash': this.hash,
            },
        };

        try {
            return this.http.post(this.url, charge, options)
                .pipe(map(response => response.data));
        } catch (e) {
            throw new Error(e);
        }
    }

    // This will only be called if the external payment api is being run locally and have webhooks paths pointing to this local service
    webhook(payment): Observable<any> {
        this.payment = payment;
        throw new HttpException('Succses webhook call', 200);
    }
}
