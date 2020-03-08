import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SafeHtml } from "@angular/platform-browser";
import { of, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SponsorService } from './sponsor.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../_Utility.service';
import { ToastrService } from 'ngx-toastr';
import { Sponsor_VM } from '../common';

@Component({
    selector: 'sponsor-edit',
    templateUrl: './edit.component.html',
})
export class SponsorEditComponent {
    title: string;
    action: string;
    paramId: number;

    public vm: Sponsor_VM = new Sponsor_VM();
    public exams: Array<any> = [];
    busySaving: Subscription;
    busyLoading: Subscription;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private service: SponsorService,
        private utilService: UtilityService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.paramId = this.route.snapshot.params['id'];
        this.action = this.paramId > 0 ? 'Edit' : 'Create';
        this.title = 'Sponsor ' + this.action;

        if (this.paramId > 0) {
            this.busyLoading = this.service.GetById(this.paramId == undefined ? 0 : this.paramId).subscribe(item => {
                this.vm = item;
            })
        }
    }

    onSubmit() {
        console.log("Saving VM : ", this.vm);
        this.busySaving = this.service.Save(this.vm).subscribe(c => {
            this.toastr.success('Changes saved successfully !!');
            this.goBack();
        });
    }

    goBack() {
        this.location.back();
    }
}