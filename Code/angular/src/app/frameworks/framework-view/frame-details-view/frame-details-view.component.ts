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

  constructor() { }

  inCompliance = false
  ngOnInit(): void {
    this.inCompliance = this.frameWorkData.parentPath == 'compliance-assessment'
  }

}
