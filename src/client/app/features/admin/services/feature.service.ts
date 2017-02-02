/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Feature } from '../models/feature';

/** Context for service calls */
export const CONTEXT = 'Feature';

/** Service Definition */
@Injectable()
export class FeatureService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getFeatures(): Observable<Feature[]> {
        return this.getList$(0, 0, true).map(res => res.json());
    }

    addFeature(feature:any): Observable<any> {
        return this.post$(feature, true).map(res => res.json());
    }

    editFeature(feature:any): Observable<any> {
        return this.put$(feature.ID, feature, true).map(res => res.json());
    }

    deleteFeature(featureId:any): Observable<any> {
        return this.delete$(featureId, true);
    }
}
