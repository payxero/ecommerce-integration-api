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
        this.url = 'https://api.zerospay.com/v1/payment/api/charge';
        this.username = 'jlborrero@gmail.com';
        this.password = '1qazxsw2';
        this.hash = 'YJU56X2NKLVBFLHGEA7J';
    }

    paymentCharge(charge: any): Observable<any> {
        const basicAuth = `Basic ${base64.encode(`${this.username}:${this.password}`)}`;
        const options: AxiosRequestConfig = {
            headers: {
                authorization: basicAuth,
                'key-hash': this.hash,
            },
        };

        return this.http.post(this.url, charge, options)
            .pipe(map(response => response.data));
    }
}
