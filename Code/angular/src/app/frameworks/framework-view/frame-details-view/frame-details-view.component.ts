import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
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
  parent;

  constructor(
    private configState:ConfigStateService,
    private frameworkService:FrameworkService
  ) { }

  inCompliance = false;
  userId;
  ngOnInit(): void {
    this.inCompliance = this.frameWorkData.parentPath == 'compliance-assessment';
    this.userId = this.configState.getAll().currentUser.id

  }


  toggleChange(ev) {
    console.log(ev);
    console.log(this.frameWorkData);
    this.frameworkService.update(this.frameWorkData.id, this.frameWorkData).subscribe((r) => {

      // this.toasterService.success('::SuccessfullySaved', "");
      // this.ref.close(r);
    });

  }
}
