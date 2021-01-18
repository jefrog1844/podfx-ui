import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dfmea} from './dfmea';
import { CrudService } from '../shared';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DfmeasService extends CrudService<Dfmea, number> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.apiUrl}/dfmeas`);
    }
   
}
