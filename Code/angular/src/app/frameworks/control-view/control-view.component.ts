import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { SharedStatus } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-control-view',
  templateUrl: './control-view.component.html',
  styleUrls: ['./control-view.component.scss']
})
export class ControlViewComponent implements OnInit {
  controlDialog;
  SharedStatus = SharedStatus;

  
  constructor(
    private activatedRoute:ActivatedRoute,
    private domainService: DomainService,
    private matDialog:MatDialog
  ) { }

  frameworkId;
  subControlId;
  subDomainId;

  subControlData;

  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.subControlId = this.activatedRoute.snapshot.params.subControlId;
    this.subDomainId = this.activatedRoute.snapshot.params.subDomainId;
    this.getControlData();
  }

  getControlData() {
    this.domainService.get(this.subDomainId).subscribe( r => {
      console.log(r);
      this.subControlData = r;
    })
  }

  openDialog(data = null) {
    let ref = this.matDialog.open(this.controlDialog, {
      data:{
        data,
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
