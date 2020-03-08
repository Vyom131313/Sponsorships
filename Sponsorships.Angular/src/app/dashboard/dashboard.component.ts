import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipService } from '../sponsorship-weekly/sponsorship.service';
import { RaviSabhaService } from '../ravi-sabha/ravi-sabha.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsorship_VM } from '../common';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    weeklyItems: Array<Sponsorship_VM>;
    monthlyItems: Array<Sponsorship_VM>;
    annualItems: Array<Sponsorship_VM>;
    busyList: Subscription;

    constructor(private service: SponsorshipService) { }

    ngOnInit() {
        // Weekly Items
        this.busyList = this.service.GetWeeklyItemsForDashboard().subscribe(x => { this.weeklyItems = x; });

        // Monthly Items
        this.busyList = this.service.GetMonthlyItemsForDashboard().subscribe(x => { this.monthlyItems = x; });

        // Annual Items
        this.busyList = this.service.GetAnnualItemsForDashboard().subscribe(x => { this.annualItems = x; });
    }
}
