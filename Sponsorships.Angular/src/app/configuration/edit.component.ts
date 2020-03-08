import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { SafeHtml } from "@angular/platform-browser";
import { of, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../_Utility.service';
import { ToastrService } from 'ngx-toastr';
import { SystemConfiguration } from '../common';

@Component({
    selector: 'configuration-edit',
    templateUrl: './edit.component.html',
})
export class ConfigurationEditComponent {
    title: string;
    action: string;
    paramId: number;

    public vm: SystemConfiguration = new SystemConfiguration();
    public exams: Array<any> = [];
    busySaving: Subscription;
    busyLoading: Subscription;

    constructor(
        private location: Location,
        private route: ActivatedRoute,        
        private sysConfigService: ConfigurationService,
        private utilService: UtilityService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this.paramId = this.route.snapshot.params['id'];
        this.action = this.paramId > 0 ? 'Edit' : 'Create';
        this.title = 'Configuration ' + this.action;

        if (this.paramId > 0) {
            this.busyLoading = this.sysConfigService.GetById(this.paramId == undefined ? 0 : this.paramId)
                .subscribe(item => {
                    this.vm = item;
                    console.log("GetById VM : ", this.vm);
                })
        }
        else {
            this.vm.Id = 0;
            this.vm.Name = "";
            this.vm.Value = "";
        }
    }

    onSubmit() {
        this.busySaving = this.sysConfigService.Save(this.vm).subscribe(c => {
            this.toastr.success('Changes saved successfully !!');
            this.goBack();
        });
    }

    goBack() {
        this.location.back();
    }
}