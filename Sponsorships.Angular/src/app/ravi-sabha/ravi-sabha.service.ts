import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { map } from "rxjs/operators";
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RaviSabha_VM } from '../common';

@Injectable()
export class RaviSabhaService {
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: HttpClient) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    GetAll(): Observable<Array<RaviSabha_VM>> {
        return this.http.get<Array<RaviSabha_VM>>(this.WebApiBaseUrl + "/RaviSabhas/GetAll");
    }

    GetForWeeklySponsorship(): Observable<Array<RaviSabha_VM>>{
        return this.http.get<Array<RaviSabha_VM>>(this.WebApiBaseUrl + "/RaviSabhas/GetForWeeklySponsorship");
    }

    GetForMonthlySponsorship(): Observable<Array<RaviSabha_VM>>{
        return this.http.get<Array<RaviSabha_VM>>(this.WebApiBaseUrl + "/RaviSabhas/GetForMonthlySponsorship");
    }

    GetById(id: number): Observable<RaviSabha_VM>{
        let prms: HttpParams = new HttpParams().set('id', id.toString());
        return this.http.get<RaviSabha_VM>(this.WebApiBaseUrl + "/RaviSabhas/GetById", { params: prms });
    }

    Save(item: RaviSabha_VM): Observable<RaviSabha_VM> {
        return this.http.post<RaviSabha_VM>(this.WebApiBaseUrl + "/RaviSabhas/Save", item);
    }
}