import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SystemConfiguration } from '../common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ConfigurationService {
    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: HttpClient) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    GetItems(): Observable<Array<SystemConfiguration>> {
        return this.http.get<Array<SystemConfiguration>>(this.WebApiBaseUrl + "/SystemConfiguration/Get");
    }

    GetById(id: number): Observable<SystemConfiguration>{
        let prms: HttpParams = new HttpParams().set('id', id.toString());

        return this.http.get<SystemConfiguration>(this.WebApiBaseUrl + "/SystemConfiguration/GetById", { params: prms });
    }

    GetByName(name: string) {
        let prms: HttpParams = new HttpParams().set('name', name.toString());
        return this.http.get<SystemConfiguration>(this.WebApiBaseUrl + "/SystemConfiguration/GetByName", { params: prms });
    }

    Save(item: SystemConfiguration): Observable<SystemConfiguration>{
        return this.http.post<SystemConfiguration>(this.WebApiBaseUrl + "/SystemConfiguration/Save", item);
    }
}