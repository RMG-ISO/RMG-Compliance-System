import { AppLayoutService } from './../shared/services/app-layout.service';
import { ConfigStateService, LanguageInfo, SessionStateService, SubscriptionService } from '@abp/ng.core';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener, Inject, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
declare var ng;
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDrawer } from '@angular/material/sidenav';
import  { ɵpublishDefaultGlobalUtils } from '@angular/core';

@Component({
  selector: 'app-compliance-layout',
  templateUrl: './compliance-layout.component.html',
  styleUrls: ['./compliance-layout.component.scss'],
  providers: [LayoutService, SubscriptionService],
})
export class ComplianceLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;
  window = window;
  // static type = eLayoutType.application;
   ;

  constructor(
    public service: LayoutService,
    private cdk: ChangeDetectorRef,
    private layoutService: LayoutService,
    private ngZone: NgZone,
    private appLayoutService: AppLayoutService,
    private app:ApplicationRef
  ) { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if(!ng) ɵpublishDefaultGlobalUtils();
    // console.log('ɵpublishGlobalUtil', ɵpublishGlobalUtil);
    
  }

  ngAfterViewInit() {
    this.service.subscribeWindowSize();

    this.drawer.openedChange.subscribe(t => {
     //to do
      console.log('dr')
      console.log(this.drawer.opened)
    })
  }

  windowWidth
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  toggleDraw() {
    this.drawer.toggle();




  }
}
