import { NgModule, Pipe, PipeTransform, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgBusyModule, BusyConfig } from 'ng-busy';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

import { DashboardComponent, DashboardService } from './dashboard';
import { ConfigurationListComponent, ConfigurationEditComponent, ConfigurationService } from './configuration';
import { RaviSabhaListComponent, RaviSabhaEditComponent, RaviSabhaService } from './ravi-sabha';
import { SponsorListComponent, SponsorEditComponent, SponsorService } from './sponsor';
import { SponsorshipWeeklyListComponent, SponsorshipWeeklyEditComponent, SponsorshipService } from './sponsorship-weekly';
import { SponsorshipMonthlyListComponent, SponsorshipMonthlyEditComponent } from './sponsorship-monthly';
import { SponsorshipAnnualListComponent, SponsorshipAnnualEditComponent } from './sponsorship-annual';
import { ReportListComponent } from './report';
import { FoyerTVComponent, FoyerTVFstComponent, FoyerTV1080pComponent, FoyerTVService } from './foyer-tv';
import { UtilityService } from './_Utility.service';

export function getBusyConfig() {
    return new BusyConfig({
        message: 'Please wait ...',
        backdrop: false,
        delay: 300,
        minDuration: 2000,
        wrapperClass: 'ng-busy'
    });
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        //NgBusyModule.forRoot(getBusyConfig()),
        NgBusyModule,
        NgSelectModule,
        ToastrModule.forRoot(), // ToastrModule added
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        SidebarComponent,
        TopbarComponent,
        //BreadcrumbComponent,
        ConfigurationListComponent,
        ConfigurationEditComponent,
        RaviSabhaListComponent,
        RaviSabhaEditComponent,
        SponsorListComponent,
        SponsorEditComponent,
        SponsorshipMonthlyListComponent,
        SponsorshipMonthlyEditComponent,
        SponsorshipWeeklyListComponent,
        SponsorshipWeeklyEditComponent,
        SponsorshipAnnualListComponent,
        SponsorshipAnnualEditComponent,
        ReportListComponent,
        FoyerTVComponent,
        FoyerTVFstComponent,
        FoyerTV1080pComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ConfigurationService,
        RaviSabhaService,
        SponsorService,
        SponsorshipService,
        DashboardService,
        UtilityService,
        FoyerTVService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}