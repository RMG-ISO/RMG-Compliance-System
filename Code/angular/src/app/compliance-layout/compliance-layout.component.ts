import { Component, OnInit, AfterViewInit, ViewChild, HostListener, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
import { MatDrawer } from '@angular/material/sidenav';
import { AppLayoutService } from '../shared/services/app-layout.service';
import { SubscriptionService } from '@abp/ng.core';


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
  ) { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;

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
