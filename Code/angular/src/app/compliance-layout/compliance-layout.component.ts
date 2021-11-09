import { ConfigStateService, LanguageInfo, SessionStateService, SubscriptionService } from '@abp/ng.core';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
declare var ng;

@Component({
  selector: 'app-compliance-layout',
  templateUrl: './compliance-layout.component.html',
  styleUrls: ['./compliance-layout.component.scss'],
  providers: [LayoutService, SubscriptionService],
})
export class ComplianceLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer;
  window = window;
  // static type = eLayoutType.application;

  constructor(
    public service: LayoutService,
    private cdk:ChangeDetectorRef,
    private layoutService:LayoutService,
    private ngZone:NgZone
    ) {}

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
    this.layoutService.sideNaveToggle.next(this.windowWidth);
    let tables = document.querySelectorAll('ngx-datatable') as any;
    for(let table of tables) {
      this.ngZone.run(() => {
        let ngEle = ng.getComponent(table);
        ngEle.rows = [...ngEle.rows]
         setTimeout(() => {ngEle.recalculateDims();ngEle.recalculateColumns()})
      })
    }
   
    this.cdk.detectChanges()
  }
}
