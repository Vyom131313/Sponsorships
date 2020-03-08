import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipService } from '../sponsorship-weekly/sponsorship.service';
import { RaviSabhaService } from '../ravi-sabha/ravi-sabha.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsor_VM, Sponsorship_VM } from '../common';

@Component({
    selector: 'report-list',
    templateUrl: 'report-list.component.html',
})
export class ReportListComponent implements OnInit {
    items_weekly: Array<Sponsorship_VM>;
    items_monthly: Array<Sponsorship_VM>;
    items_annual: Array<Sponsorship_VM>;
    items_by_sponsor: Array<Sponsorship_VM>;
    busyList: Subscription;

    constructor(private service: SponsorshipService, private raviService: RaviSabhaService) { }

    ngOnInit() {
        this.getItems();
    }

    getItems(year: number = 0) {

        console.log(year);

        if (year <= 0)
            return;

        this.busyList = this.service.GetMonthlyItemsForYear(year).subscribe(items => { this.items_monthly = items; });
        this.busyList = this.service.GetAnnualItemsForYear(year).subscribe(items => { this.items_annual = items; });
        this.busyList = this.service.GetWeeklyItemsForYear(year).subscribe(items => { this.items_weekly = items; });
        this.busyList = this.service.GetItemsGroupBySponsorsForYear(year).subscribe(items => { this.items_by_sponsor = items; });
    }

    onYearChange(selectedYear: number) {
        this.getItems(selectedYear);
    }
}