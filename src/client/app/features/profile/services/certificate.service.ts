/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Certificate } from '../models/certificate';

/** Context for service calls */
export const CONTEXT = 'Certificate';

/** Service Definition */
@Injectable()
export class CertificateService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getCertificates(): Observable<Certificate> {
        return this.getList$().map(res => res.json());
    }

    addCertificate(params): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateCertificate(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
