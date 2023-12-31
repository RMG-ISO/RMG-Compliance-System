import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from '@proxy/controls';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { ComplianceStatus, SharedStatus } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-control-view',
  templateUrl: './control-view.component.html',
  styleUrls: ['./control-view.component.scss']
})
export class ControlViewComponent implements OnInit {
  @ViewChild('controlDialog') controlDialog;
  SharedStatus = SharedStatus;
  ComplianceStatus = ComplianceStatus;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private matDialog:MatDialog,
    private controlService: ControlService,
    private domainService: DomainService,
    private router:Router,
    private frameworkService:FrameworkService,
    private configState:ConfigStateService

  ) { }

  frameworkId;
  subControlId;
  subDomainId;

  subControlData;

  subDomainData;

  showButton = false;
  parentPath;
  frameWorkData;
  userId;
  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.subControlId = this.activatedRoute.snapshot.params.subControlId;
    this.subDomainId = this.activatedRoute.snapshot.params.subDomainId;
    this.parentPath = this.router.url.includes('/compliance-assessment/') ? 'compliance-assessment' : 'frameworks'

    this.getControlData();

    this.domainService.get(this.subDomainId).subscribe( r => {
      this.subDomainData = r;
      this.showButton = r.complianceStatus === ComplianceStatus.NotStarted && this.parentPath !== 'compliance-assessment';
    });

    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      this.frameWorkData = fram;
    });

    this.userId = this.configState.getAll().currentUser.id

    // this.inAssessment = this.router.url.includes('/compliance-assessment/')
  }

  getControlData() {
    this.controlService.get(this.subControlId).subscribe( r => {
      console.log(r);
      this.subControlData = r;
    })
  }

  openDialog() {
    let ref = this.matDialog.open(this.controlDialog, {
      data:{
        data:this.subControlData,
        mode:FormMode.Edit,
      }
    });
    ref.afterClosed().subscribe( r => {
      if(r) this.getControlData();
    })
  }


  attachmentId;
  disabled = false;
  OnFileUploaded(attachmentId: string) {
    this.attachmentId = attachmentId;
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }



}
