import { SubscriptionService } from '@abp/ng.core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';

@Component({
  selector: 'app-compliance-layout',
  templateUrl: './compliance-layout.component.html',
  styleUrls: ['./compliance-layout.component.scss'],
  providers: [LayoutService, SubscriptionService],
})
export class ComplianceLayoutComponent implements OnInit, AfterViewInit {

  // static type = eLayoutType.application;

  constructor(public service: LayoutService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.service.subscribeWindowSize();
  }

}
