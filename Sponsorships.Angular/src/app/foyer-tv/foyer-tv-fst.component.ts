import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoyerTVService } from './foyer-tv.service';
import { ConfigurationService } from '../configuration';
import { SystemConfiguration } from '../common/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'foyer-tv-fst',
    templateUrl: './foyer-tv-fst.component.html',
    styles: [`
        html, body { overflow:hidden; }
    `],
    styleUrls: ['./foyer-tv-fst.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FoyerTVFstComponent implements OnInit {

    busy: Subscription;

    FOYER_REFRESH_BROWSER: string = 'false';
    FOYER_BACKGROUND: string = 'Orange';
    FOYER_TEXT_COLOR: string = '';

    slideInterval: number = 45; // 45 Seconds
    interval: any;
    setIntervalFromBrowserParameter: boolean = false;
    fixSlide: number = -1;
    currentSlide: number = -1;
    slides: Array<any> = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private _service: FoyerTVService,
        private configService: ConfigurationService) {
    }

    ngOnInit(): void {

        this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                if (isNaN(params['interval']) == false) {
                    this.slideInterval = Number(params['interval']);
                    this.setIntervalFromBrowserParameter = true;
                }

                if (isNaN(params['slide']) == false) {
                    this.fixSlide = Number(params['slide']);
                }

                console.log("Initial Slide Interval : " + this.slideInterval);
            });

        this.foyerView();

        this.configService.GetByName("FOYER_SLIDE_DURATION").subscribe(configItem => {
            // if not set from browser param
            if (this.setIntervalFromBrowserParameter == false) {
                this.slideInterval = Number(configItem.Value);
                console.log("FOYER_SLIDE_DURATION : " + this.slideInterval);
            }

            this.changeSlide();
            this.setSlideInterval();
        });
    }

    changeSlide() {

        this.currentSlide++;

        if (this.currentSlide >= this.slides.length)
            this.currentSlide = 0;

        if (this.currentSlide == 0)
            this.getData();

        if (this.fixSlide > -1)
            this.currentSlide = this.fixSlide;

        var logMessage = "";
        logMessage = 'Slide-' + this.currentSlide;
        //if (this.currentSlide >= 0)
        if (this.slides[this.currentSlide] != null)
            logMessage += " " + this.slides[this.currentSlide].Title;
        console.log(logMessage);
    }

    getData() {
        this.busy = this._service.getFoyerData().subscribe(result => {
            console.log(result);
            this.slides = result.Slides;

            var configBackground = result.SystemConfigurations.filter(c => c.Name == "FOYER_BACKGROUND")[0];
            this.FOYER_BACKGROUND = configBackground != null ? configBackground.Value : 'Orange';

            var configTextColor = result.SystemConfigurations.filter(c => c.Name == "FOYER_TEXT_COLOR")[0];
            this.FOYER_TEXT_COLOR = configTextColor != null ? configTextColor.Value : '';

            var configRefreshPage = result.SystemConfigurations.filter(c => c.Name == "FOYER_REFRESH_BROWSER")[0];
            this.FOYER_REFRESH_BROWSER = configRefreshPage != null ? configRefreshPage.Value : '';

            if (this.FOYER_REFRESH_BROWSER == 'true') {
                location.reload(true);
            }

            var configSlideDur = result.SystemConfigurations.filter(c => c.Name == "FOYER_SLIDE_DURATION")[0];
            if (configSlideDur != null &&
                this.slideInterval != Number(configSlideDur.Value)) {
                this.slideInterval = Number(configSlideDur.Value);
                this.setSlideInterval();
            }

            /*
            this.systemConfigurationsService.GetByName("FOYER_SLIDE_DURATION").then(configItem => {
                if (this.slideInterval != configItem.Value) {
                    this.slideInterval = configItem.Value;
                    this.setSlideInterval();
                }
            });*/
        });
    }

    setSlideInterval() {
        if (this.interval != null) {
            clearInterval(this.interval);
        }

        console.log("SetSlideInterval : " + this.slideInterval);

        this.interval = setInterval(() => { this.changeSlide(); }, (this.slideInterval * 1000));
    }

    foyerView() {
        this.hideElement('sidebar');
        this.hideElement('topbar');
        this.hideElement('footer');

        var mainContainer = document.getElementById('main-container');
        mainContainer.setAttribute('style', 'padding-top:0rem;padding-right:0rem;padding-bottom:0rem;padding-left:0rem;');

        var contentWrapper = document.getElementById('content-wrapper');
        contentWrapper.setAttribute('style', 'padding-top:0rem;padding-right:0rem;padding-bottom:0rem;padding-left:0rem;');

        var mainContent = document.getElementById('main-content');
        mainContent.setAttribute('style', 'padding-top:0rem;padding-right:0rem;padding-bottom:0rem;padding-left:0rem;');

        //var scrollDiv = document.getElementsByClassName('scrollable-container').item(0);
        //scrollDiv.setAttribute('class', '');

        var body = document.getElementsByTagName('body').item(0);
        //body.setAttribute('style', 'overflow:auto;');
        body.setAttribute('style', 'overflow-y: hidden;');
    }

    hideElement(elementName: string) {
        console.log('HideElement', elementName);
        var element = document.getElementById(elementName);
        var elementParent = document.getElementById(elementName).parentElement;
        elementParent.removeChild(element);
    }
}