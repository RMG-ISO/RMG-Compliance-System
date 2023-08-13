import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { ComplianceStatus, FrameworkStatus, SharedStatus, sharedStatusOptions } from '@proxy/shared';
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.scss'],
  providers:[
    ListService
  ]
})
export class FrameworkViewComponent implements OnInit {
  @ViewChild('frameDialog') frameDialog;
  @ViewChild('refuseCauseDialog') refuseCauseDialog;
  @ViewChild('reviewAlert') reviewAlert;
  @ViewChild('reviewDecisionAlert') reviewDecisionAlert;
  @ViewChild('fileInput') fileInput : ElementRef<HTMLInputElement>;
  @ViewChild('download') downloadElement : ElementRef<HTMLAnchorElement>;

  dateFormat = 'yyyy/MM/dd'
  dateTimeFormat = 'yyyy/MM/dd HH:mm'
  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';
  activeSubTab = 'statistics';

  SharedFrameworkStatus = FrameworkStatus;
  sharedStatusOptions = sharedStatusOptions;
  
  ComplianceStatus = ComplianceStatus;

  constructor(
    public  activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private router:Router,
    private domainService: DomainService,
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService,
    private toasterService:ToasterService
  ) { }

  frameworkId;
  frameWorkData;

  currentLang;
  userId;

  parentPath;
  showButton = false;

  ngOnInit(): void {
    this.parentPath  = this.activatedRoute.snapshot.parent.routeConfig.path;
    this.currentLang = this.localizationService.currentLang;
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.userId = this.configState.getAll().currentUser.id;


    this.getFrameWork();
  }

  getFrameWork() {
    this.frameWorkData = null;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      this.frameWorkData = fram;
      this.frameWorkData['parentPath'] = this.parentPath;

      this.showButton = fram.complianceStatus === ComplianceStatus.NotStarted && this.parentPath !== 'compliance-assessment';
      // this.getMainDomainsList();
    });
  }

  activeComponent;
  changeRoute(component) {
    this.activeComponent = component;
    component.frameWorkData = this.frameWorkData;
    component.parent = this;
  }


  form:FormGroup;

  changeCreateFrameStatus(cond) {
    if(cond) this.frameworkService.sendToReviewerById(this.frameWorkData.id).subscribe(r => {
      // window.location.reload();
      this.toasterService.success('::FrameworkSentForRevision', "");
      this.getFrameWork();
    })
  }

  changeReviewFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.sendToOwnerById(this.frameWorkData.id).subscribe(r => {
        // window.location.reload();
        this.toasterService.success('::FrameworkSentForApproval', "");
        this.getFrameWork();
      });
      return;
    }

    this.form = new FormGroup({
      reason: new FormControl(null, Validators.required)
    });

    let ref = this.matDialog.open(this.refuseCauseDialog);
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameworkService.returnToCreatorByIdAndInput(this.frameWorkData.id, this.form.value).subscribe(r => {
          // window.location.reload();
          this.toasterService.success('::FrameworkReturnedToCreator', "");
          this.getFrameWork();
        });
      } else ngSelect.clearModel();
    })
  }

  changeApproveFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.approveById(this.frameWorkData.id).subscribe(r => {
        // window.location.reload();
        this.toasterService.success('::FrameworkApproved', "");
        this.getFrameWork();
      });
      return;
    }

    this.form = new FormGroup({
      reason: new FormControl(null, Validators.required)
    });

    let ref = this.matDialog.open(this.refuseCauseDialog);
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameworkService.returnToCreatorByIdAndInput(this.frameWorkData.id, this.form.value).subscribe(r => {
          // window.location.reload();
          this.toasterService.success('::FrameworkReturnedToCreator', "");
          this.getFrameWork();
        });
      } else ngSelect.clearModel();
    })
  }

  isSendingStatus = false;
  changeFrameActivityStatus(cond) {
    if(cond == undefined) return;
    this.isSendingStatus = true;
    
    let func = cond == SharedStatus.Active ? this.frameworkService.activateById : this.frameworkService.deactivateById;
    func(this.frameWorkData.id)
    .pipe( finalize(() => this.isSendingStatus = false) )
    .subscribe(r => {
      // window.location.reload();
      this.toasterService.success('::SuccessfullySaved', "");
      this.getFrameWork();
    })
  }

  openFrameDialog(mode = FormMode.Create) {
    let ref = this.matDialog.open(this.frameDialog, {
      data:{
        data:this.frameWorkData,
        mode
      },
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameWorkData = con;
        this.list.get();
      }
    })
  }

  sendForInternalAssessment() {
    this.frameworkService.sendForInternalAssessmentById(this.frameWorkData.id).subscribe(r => {
      this.toasterService.success('::FrameworkSentForInternalAssessmentSuccessfully', "");
      this.getFrameWork();
      // window.location.reload()
    });
  }

  approveFramework() {
    this.frameworkService.approveComplianceById(this.frameWorkData.id).subscribe( r => {
      // window.location.reload();
      this.toasterService.success('::FrameworkComplianceApprovedSuccessfully', "");
      this.getFrameWork();
    })
  }

  uploadDownloadExcel($event , ngSelect) {
    if($event == undefined) return;

    if ($event) {
      this.fileInput.nativeElement.click();
      return;
    }

    this.downloadExcelFile();
    
    ngSelect.clearModel();
  }

  downloadExcelFile() {
    this.frameworkService.getTempExcelFile().subscribe(file => {
      const downloadUrl =window.URL.createObjectURL(file);
      this.downloadElement.nativeElement.href = downloadUrl;
      this.downloadElement.nativeElement.download = "Framework Data.xlsx";
      this.downloadElement.nativeElement.click();
      window.URL.revokeObjectURL(downloadUrl);

      this.toasterService.success('::SuccessfullyDownloaded' , '', { life : 3000})
    });
  }
  onfileSelected($event) {
    const fileElement = $event.target as HTMLInputElement;
    if (!fileElement || !fileElement.files || fileElement.files.length < 1)
      return;
    
    this.saveFile(fileElement.files[0]);
  }

  saveFile(file : File) {

    const formData = new FormData();
    formData.append('file', file as Blob);

    this.frameworkService.importExcelFile(formData, this.frameworkId).pipe(
      catchError(err => {
        this.toasterService.error("::ExcelFileError");
        return EMPTY;
      })
    ).subscribe(
      () => { 
        this.toasterService.success('::SuccessfullyImported', '', { life: 4000 }); 
        window.location.reload(); 
      }
    );  
    }
}
