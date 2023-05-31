import { ConfigStateService, ListService, LocalizationService  } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkStatus, SharedStatus, sharedStatusOptions } from '@proxy/shared';
import { finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

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
  @ViewChild('domainDialog') domainDialog;
  @ViewChild('refuseCauseDialog') refuseCauseDialog;
  @ViewChild('fileInput') fileInput : ElementRef<HTMLInputElement>;
  @ViewChild('download') downloadElement : ElementRef<HTMLAnchorElement>;

  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';

  SharedFrameworkStatus = FrameworkStatus;
  sharedStatusOptions = sharedStatusOptions;
  
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
    private toaster: ToasterService,
    private httpClient : HttpClient
  ) { }

  frameworkId;
  frameWorkData;

  currentLang;
  userId;

  inAssessment = false;
  ngOnInit(): void {
    this.currentLang = this.localizationService.currentLang;

    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      console.log(fram);
      this.frameWorkData = fram;
      this.inAssessment = !!fram.selfAssessmentStartDate;
      this.getMainDomainsList();
    });

    this.userId = this.configState.getAll().currentUser.id
  }

  selectedToDelete = {};
  deleteLength = 0;
  selectChanged(checked, id){
    this.selectedToDelete[id] = checked;
    this.deleteLength = checked ? this.deleteLength + 1 : this.deleteLength - 1;
  }

  deleteItems(){
    // deleteSelectedItem
    this.confirmation.warn('::DeleteSelectedItem', '::AreYouSure')
    .subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        // this.domainService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }


  mainDomainsItems;
  getMainDomainsList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: true, search: search, frameworkId: this.frameworkId, maxResultCount:null });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainDomainsItems = response.items;
      this.selectedToDelete = {};
      this.deleteLength = 0;
      // this.totalCount = response.totalCount;
    });
  }


  form:FormGroup;

  changeCreateFrameStatus(cond) {
    if(cond) this.frameworkService.sendToReviewerById(this.frameWorkData.id).subscribe(r => {
      window.location.reload();
    })
  }

  changeReviewFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.sendToOwnerById(this.frameWorkData.id).subscribe(r => {
        window.location.reload();
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
          window.location.reload();
        });
      } else ngSelect.clearModel();
    })
  }

  changeApproveFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.approveById(this.frameWorkData.id).subscribe(r => {
        window.location.reload();
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
          window.location.reload();
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
      window.location.reload();
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
  

  openDomainDialog(data = null, mode = FormMode.Create, mainDomain, subDomainsTable) {
    let ref = this.matDialog.open(this.domainDialog, {
      data:{
        data,
        mode,
        mainDomain
      },
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        if(subDomainsTable) subDomainsTable.list.get();
        else this.list.get();
      }
    })
  }


  OnFileUploaded(attachmentId: string) {
    this.frameWorkData.attachmentId = attachmentId;
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }


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

      this.toaster.success('::SuccessfullyDownloaded' , '', { life : 3000})
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
        this.toaster.error("::ExcelFileError");
        return EMPTY;
      })
    ).subscribe(
      () => this.toaster.success('::SuccessfullyImported', '' , { life : 4000})
    );  
    }
    
  }
