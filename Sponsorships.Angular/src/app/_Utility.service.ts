import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
//import "rxjs/add/operator/filter";

@Injectable()
export class UtilityService {

    public WebApiBaseUrl: string = "http://sponsorships.xitiz.net/api";

    constructor(private http: Http) {
        if (/localhost/.test(document.location.host)) {
            this.WebApiBaseUrl = "http://localhost:64342/api";
        }
    }

    getDateDifference(fromdate, todate, datepart) {
        datepart = datepart.toLowerCase();
        var diff = todate - fromdate;
        var divideBy = {
            w: 604800000,
            d: 86400000,
            h: 3600000,
            n: 60000,
            s: 1000
        };

        return Math.floor(diff / divideBy[datepart]);
    }

    fieldSorter(fields) {
        return function (a, b) {
            return fields
                .map(function (o) {
                    var dir = 1;
                    if (o[0] === '-') {
                        dir = -1;
                        o = o.substring(1);
                    }
                    if (a[o] > b[o]) return dir;
                    if (a[o] < b[o]) return -(dir);
                    return 0;
                })
                .reduce(function firstNonZeroValue(p, n) {
                    return p ? p : n;
                }, 0);
        };
    }


    DownloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }

    GetSpaces(cnt) {
        var spaces = '';
        for (var i = 0; i < cnt; i++)
            spaces += ' ';

        return spaces;
    }
}

/*
@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        const groupedObj = value.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            } else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        return Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] } });
    }
}
*/