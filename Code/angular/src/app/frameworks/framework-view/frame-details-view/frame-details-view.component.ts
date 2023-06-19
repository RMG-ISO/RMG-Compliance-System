import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ComplianceStatus } from '@proxy/shared';

@Component({
  selector: 'app-frame-details-view',
  templateUrl: './frame-details-view.component.html',
  styleUrls: ['./frame-details-view.component.scss']
})
export class FrameDetailsViewComponent implements OnInit {
  frameWorkData;
  dateTimeFormat = 'yyyy/MM/dd HH:mm';
  ComplianceStatus = ComplianceStatus;

  constructor(
    private configState:ConfigStateService
  ) { }

  inCompliance = false;
  userId;
  ngOnInit(): void {
    this.inCompliance = this.frameWorkData.parentPath == 'compliance-assessment';
    this.userId = this.configState.getAll().currentUser.id

  }


  toggleChange(ev) {
    console.log(ev);
  }
}
