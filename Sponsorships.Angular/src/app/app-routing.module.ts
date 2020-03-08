import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { ConfigurationListComponent, ConfigurationEditComponent } from './configuration';
import { RaviSabhaListComponent, RaviSabhaEditComponent } from './ravi-sabha';
import { SponsorListComponent, SponsorEditComponent } from './sponsor';
import { SponsorshipWeeklyListComponent, SponsorshipWeeklyEditComponent } from './sponsorship-weekly';
import { SponsorshipMonthlyListComponent, SponsorshipMonthlyEditComponent } from './sponsorship-monthly';
import { SponsorshipAnnualListComponent, SponsorshipAnnualEditComponent } from './sponsorship-annual';
import { ReportListComponent } from './report';
import { FoyerTVComponent, FoyerTVFstComponent,FoyerTV1080pComponent } from './foyer-tv';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
    { path: 'configuration', component: ConfigurationListComponent },
    { path: 'configuration/:id', component: ConfigurationEditComponent },
    { path: 'ravi-sabha', component: RaviSabhaListComponent },
    { path: 'ravi-sabha/:id', component: RaviSabhaEditComponent },
    { path: 'sponsor', component: SponsorListComponent },
    { path: 'sponsor/:id', component: SponsorEditComponent },
    { path: 'sponsorship-monthly', component: SponsorshipMonthlyListComponent },
    { path: 'sponsorship-monthly/:id', component: SponsorshipMonthlyEditComponent },
    { path: 'sponsorship-weekly', component: SponsorshipWeeklyListComponent },
    { path: 'sponsorship-weekly/:id', component: SponsorshipWeeklyEditComponent },
    { path: 'sponsorship-annual', component: SponsorshipAnnualListComponent },
    { path: 'sponsorship-annual/:id', component: SponsorshipAnnualEditComponent },
    { path: 'report', component: ReportListComponent },
    { path: 'foyer-tv', component: FoyerTVComponent },
    { path: 'foyer-tv-fst', component: FoyerTVFstComponent },
    { path: 'foyer-tv-1080p', component: FoyerTV1080pComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true
                //enableTracing: true, // <-- debugging purposes only
            }
        )
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }