import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { map } from "rxjs/operators";
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sponsor_VM } from '../common';


@Injectable()
export class SponsorService {
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: HttpClient) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    GetItems(): Observable<Array<Sponsor_VM>> {
        return this.http.get<Array<Sponsor_VM>>(this.WebApiBaseUrl + "/Sponsors/Get");
    }

    GetById(id: number): Observable<Sponsor_VM> {
        let prms: HttpParams = new HttpParams().set('id', id.toString());
        return this.http.get<Sponsor_VM>(this.WebApiBaseUrl + "/Sponsors/GetById", { params: prms });
    }

    Save(item: Sponsor_VM): Observable<Sponsor_VM> {
        return this.http.post<Sponsor_VM>(this.WebApiBaseUrl + "/Sponsors/Save", item);
    }
}