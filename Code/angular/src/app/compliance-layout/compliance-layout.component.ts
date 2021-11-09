import { AppLayoutService } from './../shared/services/app-layout.service';
import { ConfigStateService, LanguageInfo, SessionStateService, SubscriptionService } from '@abp/ng.core';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
declare var ng;
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDrawer } from '@angular/material/sidenav';


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

  constructor(
    public service: LayoutService,
    private cdk: ChangeDetectorRef,
    private layoutService: LayoutService,
    private ngZone: NgZone,
    private appLayoutService: AppLayoutService
  ) { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;

  }

  ngAfterViewInit() {
    this.service.subscribeWindowSize();
  }

  windowWidth
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  toggleDraw() {
    this.drawer.toggle();

    this.drawer.openedChange.subscribe(t => {
      let tables = document.querySelectorAll('ngx-datatable');
      for (let table of tables as any) {
        let ngEle = ng.getComponent(table);
        var el = <DatatableComponent>ngEle;
        el.recalculate()
      }
    })


  }
}
