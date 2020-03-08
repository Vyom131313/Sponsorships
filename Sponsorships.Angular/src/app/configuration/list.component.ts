import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from './configuration.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { SystemConfiguration } from '../common/models';

@Component({
    selector: 'configuration-list',
    templateUrl: 'list.component.html',
})
export class ConfigurationListComponent implements OnInit {
    public master_list: Array<SystemConfiguration>;
    public items: Array<SystemConfiguration>;
    busyList: Subscription;
    filter: string = '';

    constructor(private service: ConfigurationService) {}
    
    ngOnInit(){
        this.getItems();
    }

    getItems() {
        this.busyList = this.service.GetItems().subscribe(x => {
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
                                c.Name.toLowerCase().indexOf(this.filter.toLowerCase())>=0 || 
                                c.Value.toLowerCase().indexOf(this.filter.toLowerCase())>=0)
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