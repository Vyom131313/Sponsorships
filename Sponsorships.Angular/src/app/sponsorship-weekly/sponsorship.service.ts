import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { map } from "rxjs/operators";
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sponsorship_VM, SponsorshipType, SponsorshipReasonType } from '../common';


@Injectable()
export class SponsorshipService {
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: HttpClient) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    GetWeeklyItemsByRaviSabha(raviSabhaId: number): Observable<Array<Sponsorship_VM>> {
        let prms: HttpParams = new HttpParams().set('raviSabhaId', raviSabhaId.toString());

        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetWeeklyItemsByRaviSabha", { params: prms });
    }

    GetWeeklyItemsForYear(year: number): Observable<Array<Sponsorship_VM>> {
        let prms: HttpParams = new HttpParams().set('year', year.toString());

        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetWeeklyItemsForYear", { params: prms });
    }

    GetMonthlyItemsForYear(year: number): Observable<Array<Sponsorship_VM>> {
        let prms: HttpParams = new HttpParams().set('year', year.toString());

        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetMonthlyItemsForYear", { params: prms });
    }

    GetAnnualItemsForYear(year: number): Observable<Array<Sponsorship_VM>> {
        let prms: HttpParams = new HttpParams().set('year', year.toString());

        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetAnnualItemsForYear", { params : prms });
    }

    GetItemsGroupBySponsorsForYear(year: number): Observable<Array<Sponsorship_VM>> {
        let prms: HttpParams = new HttpParams().set('year', year.toString());

        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetItemsGroupBySponsorsForYear", { params: prms });
    }

    GetWeeklyItemsForDashboard(): Observable<Array<Sponsorship_VM>> {
        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetWeeklyItemsForDashboard");
    }

    GetMonthlyItemsForDashboard(): Observable<Array<Sponsorship_VM>> {
        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetMonthlyItemsForDashboard");
    }

    GetAnnualItemsForDashboard(): Observable<Array<Sponsorship_VM>> {
        return this.http.get<Array<Sponsorship_VM>>(this.WebApiBaseUrl + "/Sponsorships/GetAnnualItemsForDashboard");
    }

    GetById(id: number): Observable<Sponsorship_VM> {
        let prms: HttpParams = new HttpParams().set('id', id.toString());
        return this.http.get<Sponsorship_VM>(this.WebApiBaseUrl + "/Sponsorships/GetById", { params: prms });
    }

    GetSponsorshipTypesWeekly(): Observable<Array<SponsorshipType>>  {
        return this.http.get<Array<SponsorshipType>>(this.WebApiBaseUrl + "/Lookup/SponsorshipTypesWeekly");
    }

    GetSponsorshipTypesAnnual(): Observable<Array<SponsorshipType>>  {
        return this.http.get<Array<SponsorshipType>>(this.WebApiBaseUrl + "/Lookup/SponsorshipTypesAnnual");
    }

    GetSponsorshipTypesMonthly(): Observable<Array<SponsorshipType>>  {
        return this.http.get<Array<SponsorshipType>>(this.WebApiBaseUrl + "/Lookup/SponsorshipTypesMonthly");
    }

    GetSponsorshipReasonTypes(): Observable<Array<SponsorshipReasonType>>  {
        return this.http.get<Array<SponsorshipReasonType>>(this.WebApiBaseUrl + "/Lookup/SponsorshipReasonTypes");
    }

    Save(item: any): Observable<any> {
        return this.http.post<any>(this.WebApiBaseUrl + "/Sponsorships/Save", item);
    }
}