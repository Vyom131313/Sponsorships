import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipService } from '../sponsorship-weekly/sponsorship.service';
import { RaviSabhaService } from '../ravi-sabha/ravi-sabha.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsorship_VM } from '../common';

@Component({
    selector: 'sponsorship-monthly-list',
    templateUrl: 'list.component.html',
})
export class SponsorshipMonthlyListComponent implements OnInit {
    items: Array<Sponsorship_VM>;
    busyList: Subscription;

    constructor(private service: SponsorshipService, private raviService: RaviSabhaService) { }

    ngOnInit() {
        this.getMonthlySponsors();
    }

    getMonthlySponsors() {
        this.busyList = this.service.GetMonthlyItemsForYear((new Date()).getFullYear()).subscribe(x => {
            this.items = x;
        });
    }
}