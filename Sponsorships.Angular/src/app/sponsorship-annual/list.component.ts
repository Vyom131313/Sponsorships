import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipService } from '../sponsorship-weekly/sponsorship.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsorship_VM } from '../common';

@Component({
    selector: 'sponsorship-annual-list',
    templateUrl: 'list.component.html',
})
export class SponsorshipAnnualListComponent implements OnInit {
    items: Array<Sponsorship_VM>;
    busyList: Subscription;

    constructor(private service: SponsorshipService) { }

    ngOnInit() {
        let year = (new Date()).getFullYear();
        this.busyList = this.service.GetAnnualItemsForYear(year).subscribe(x => { this.items = x; });
    }
}