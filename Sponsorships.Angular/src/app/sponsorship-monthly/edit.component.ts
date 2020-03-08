import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SafeHtml } from "@angular/platform-browser";
import { of, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SponsorshipService} from '../sponsorship-weekly/sponsorship.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { RaviSabhaService } from '../ravi-sabha/ravi-sabha.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../_Utility.service';
import { ToastrService } from 'ngx-toastr';
import { Sponsorship_VM, RaviSabha_VM } from '../common';

@Component({
    selector: 'sponsorship-monthly-edit',
    templateUrl: './edit.component.html',
})
export class SponsorshipMonthlyEditComponent {
    title: string;
    action: string;
    paramId: number;
    busySaving: Subscription;
    busyLoading: Subscription;

    public vm: Sponsorship_VM = new Sponsorship_VM();
    public raviSabhaItems: Array<any>;
    public sponsors: Array<any> = [];
    public filteredReasonTypes: any;
    public sponsorshipTypes: Array<any> = [];
    public reasonTypes: Array<any> = [];

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private raviSabhaService: RaviSabhaService,
        private sponsorService: SponsorService,
        private service: SponsorshipService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.paramId = this.route.snapshot.params['id'];
        this.action = this.paramId > 0 ? 'Edit' : 'Create';
        this.title = 'Sponsorship Monthly ' + this.action;

        if (this.paramId > 0) {
            this.busyLoading = this.service.GetById(this.paramId == undefined ? 0 : this.paramId).subscribe(item => {
                this.vm = item;
                console.log("GetById VM : ", this.vm);
                this.vm = this.vm == null ? new Sponsorship_VM() : this.vm;
                this.loadDropDowns();
            });
        }
        else {
            this.loadDropDowns();
        }
    }

    loadDropDowns() {
        this.busyLoading = this.sponsorService.GetItems().subscribe(items => { this.sponsors = items; });
        this.busyLoading = this.raviSabhaService.GetForMonthlySponsorship().subscribe(items => { this.raviSabhaItems = items; });
        this.busyLoading = this.service.GetSponsorshipTypesMonthly().subscribe(items => { this.sponsorshipTypes = items; });
        this.busyLoading = this.service.GetSponsorshipReasonTypes().subscribe(items => { this.reasonTypes = items; });
    }

    onSubmit() {
        this.busySaving = this.service.Save(this.vm).subscribe(c => {
            this.toastr.success('Changes saved successfully !!');
            this.goBack();
        });
    }

    goBack() {
        this.location.back();
    }
}