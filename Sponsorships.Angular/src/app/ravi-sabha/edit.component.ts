import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SafeHtml } from "@angular/platform-browser";
import { of, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RaviSabhaService } from './ravi-sabha.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../_Utility.service';
import { ToastrService } from 'ngx-toastr';
import { RaviSabha_VM } from '../common';

@Component({
    selector: 'ravi-sabha-edit',
    templateUrl: './edit.component.html',
})
export class RaviSabhaEditComponent {
    title: string;
    action: string;
    paramId: number;

    public vm: RaviSabha_VM = new RaviSabha_VM();
    public exams: Array<any> = [];
    busySaving: Subscription;
    busyLoading: Subscription;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private raviSabhaService: RaviSabhaService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.paramId = this.route.snapshot.params['id'];
        this.action = this.paramId > 0 ? 'Edit' : 'Create';
        this.title = 'Ravi Sabha ' + this.action;

        if (this.paramId > 0) {
            this.busyLoading = this.raviSabhaService.GetById(this.paramId == undefined ? 0 : this.paramId).subscribe(item => {
                this.vm = item;
                console.log("GetById VM : ", this.vm);
            })
        }
    }

    onSubmit() {
        console.log("Saving VM : ", this.vm);
        this.busySaving = this.raviSabhaService.Save(this.vm).subscribe(c => {
            this.toastr.success('Changes saved successfully !!');
            this.goBack();
        });
    }

    goBack() {
        this.location.back();
    }
}