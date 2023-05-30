import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { IFormFile } from '@proxy/microsoft/asp-net-core/http';
import { SharedFrameworkStatus, SharedStatus } from '@proxy/shared';
import { IRemoteStreamContent } from '@proxy/volo/abp/content';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { saveAs } from 'file-saver';

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

  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';

  SharedFrameworkStatus = SharedFrameworkStatus;

  uploadfile : IRemoteStreamContent;
  
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
    private toaster: ToasterService
  ) { }

  frameworkId;
  frameWorkData;

  currentLang;
  userId;
  ngOnInit(): void {
    this.currentLang = this.localizationService.currentLang;

    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      console.log(fram);
      this.frameWorkData = fram;
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

  uploadDownloadExcel($event) {
    if($event == undefined) return;

    if ($event) {
      
      this.fileInput.nativeElement.click();
    }

    this.frameworkService.getTempExcelFile().subscribe(file => {
      saveAs(file, 'Excel file temp');
    });
    
  }
  onfileSelected($event) {
    const fileElement = $event.target as HTMLInputElement;
  
    
    if (!fileElement || !fileElement.files || fileElement.files.length < 1)
      return;
    
      this.uploadfile = fileElement.files[0] as IRemoteStreamContent;

      this.saveFile(this.uploadfile);
      
  }

  saveFile(file : IRemoteStreamContent) {

    const formData = new FormData();
    formData.append('file',file as Blob);
    this.frameworkService.importExcelFile(file,this.frameworkId).pipe(
      catchError(err => { 
        this.toaster.error("::ExcelFileError"); 
        return EMPTY; 
      })
    ).subscribe(
      () => this.toaster.success('Message', 'Title')
    );
  }

}
