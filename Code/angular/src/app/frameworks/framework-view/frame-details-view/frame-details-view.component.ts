import { ConfigStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { ComplianceStatus, FrameworkStatus } from '@proxy/shared';

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
  SharedFrameworkStatus = FrameworkStatus;

  constructor(
    private configState:ConfigStateService,
    private frameworkService:FrameworkService,
    private toasterService:ToasterService

  ) { }

  inCompliance = false;
  userId;
  ngOnInit(): void {
    this.inCompliance = this.frameWorkData.parentPath == 'compliance-assessment';
    this.userId = this.configState.getAll().currentUser.id

  }


  toggleChange(ev) {
    this.frameworkService.togglePriorityById(this.frameWorkData.id).subscribe((r) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.parent.frameWorkData.hasPriority = ev.checked;
      // this.parent.getFrameWork();
    });

  }
}
