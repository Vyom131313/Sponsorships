import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorService } from './sponsor.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsor_VM } from '../common';

@Component({
    selector: 'sponsor-list',
    templateUrl: 'list.component.html',
})
export class SponsorListComponent implements OnInit {
    public master_list: Array<Sponsor_VM>;
    public items: Array<Sponsor_VM>;
    busyList: Subscription;
    filter: string = '';

    constructor(private service: SponsorService) { }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.busyList = this.service.GetItems().subscribe(x => {
                this.master_list= x;
                this.applyFilterAndSort();
            });

        //this.busyList = new Promise(resolve => {
        //    setTimeout(() => {
        //        resolve();
        //        console.log('Promise finished!');
        //    }, 3000);
        //});
    }

    applyFilterAndSort() {
        this.filter = this.filter.trim();
        this.items = [];
        from(this.master_list)
            .pipe(filter(c =>
                (this.filter.length > 0 && c.FullNameWithSpouseAndAddress.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
                ||
                this.filter.length == 0))
            .subscribe(val => this.items.push(val));
    }

    onFilter(event: Event) { this.applyFilterAndSort(); }

    onClearFilter(event: Event) {
        this.filter = '';
        this.applyFilterAndSort();
    }
}