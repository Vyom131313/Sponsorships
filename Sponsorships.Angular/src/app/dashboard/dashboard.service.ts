import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class DashboardService {

    //public WebApiBaseUrl: string = "http://localhost:64342/api";
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: Http) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }
}