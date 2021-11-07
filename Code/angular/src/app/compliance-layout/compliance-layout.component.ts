import { ConfigStateService, LanguageInfo, SessionStateService, SubscriptionService } from '@abp/ng.core';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener, Inject } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';

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

}
