import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foyer_VM } from '../common';

@Injectable()
export class FoyerTVService {

    //public WebApiBaseUrl: string = "http://localhost:64342/api";
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: HttpClient) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    getFoyerData(): Observable<Foyer_VM> {
        return this.http.get<Foyer_VM>(this.WebApiBaseUrl + "/Foyer/GetFoyerData");
    }

    getFoyerData1080P(): Observable<Foyer_VM> {
        return this.http.get<Foyer_VM>(this.WebApiBaseUrl + "/Foyer/GetFoyerData1080P");
    }

    /*
    getFoyerSlides(http: Http) {
        return http.get(this.WebApiBaseUrl + "/Foyer/GetFoyerSlides")
            .toPromise()
            .then((response) => response.json());
    }*/
}