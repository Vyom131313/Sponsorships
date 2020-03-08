import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RaviSabhaService } from './ravi-sabha.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { RaviSabha_VM } from '../common';

@Component({
    selector: 'ravi-sabha-list',
    templateUrl: 'list.component.html',
})
export class RaviSabhaListComponent  implements OnInit {
    public master_list: Array<RaviSabha_VM>;
    public items: Array<RaviSabha_VM>;
    busyList: Subscription;
    filter: string = '';

    constructor(private service: RaviSabhaService) {}
    
    ngOnInit(){
        this.getItems();
    }

    getItems() {
        this.busyList = this.service.GetAll().subscribe(x => {
            this.master_list= x;
            console.log("master_list : ",this.master_list);
            
            this.applyFilterAndSort();
        });
    }

    applyFilterAndSort() {
        this.filter = this.filter.trim();
        this.items = [];
        from(this.master_list)
            .pipe(filter(c => 
                            this.filter.length > 0 && (
                                c.SabhaShortDate.toLowerCase().indexOf(this.filter.toLowerCase())>=0 || 
                                c.Description.toLowerCase().indexOf(this.filter.toLowerCase())>=0)
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