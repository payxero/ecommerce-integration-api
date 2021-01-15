import { Injectable, HttpService } from '@nestjs/common';

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
}
