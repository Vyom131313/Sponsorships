import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipService } from './sponsorship.service';
import { RaviSabhaService } from '../ravi-sabha/ravi-sabha.service';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Sponsorship_VM, RaviSabha_VM } from '../common';

@Component({
    selector: 'sponsorship-weekly-list',
    templateUrl: 'list.component.html',
})
export class SponsorshipWeeklyListComponent implements OnInit {
    items: Array<Sponsorship_VM>;
    raviSabhas: Array<RaviSabha_VM>;
    selectedRaviSabhaId: number = 0;
    busyList: Subscription;

    constructor(private service: SponsorshipService, private raviService: RaviSabhaService) { }

    ngOnInit() {
        this.getRaviSabhaForWeeklySponsorship();
    }

    getRaviSabhaForWeeklySponsorship() {
        this.busyList = this.raviService.GetForWeeklySponsorship().subscribe(x => {
            this.raviSabhas = x;

            var selectedRaviSabha = this.raviSabhas.filter(c => c.IsCurrentWeek == true)[0];
            console.log('selectedRaviSabha ', selectedRaviSabha);

            if (selectedRaviSabha != null) {
                this.selectedRaviSabhaId = selectedRaviSabha.Id;
                this.onRaviSabhaChange(this.selectedRaviSabhaId);
            }
        });
    }

    onRaviSabhaChange(id: number) {
        this.busyList = this.service.GetWeeklyItemsByRaviSabha(id).subscribe(x => {
            this.items = x;
        });
    }
}