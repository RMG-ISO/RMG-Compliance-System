import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { ComplianceStatus, FrameworkStatus, SharedStatus, sharedStatusOptions } from '@proxy/shared';
import { finalize } from 'rxjs/operators';
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
  @ViewChild('domainDialog') domainDialog;
  @ViewChild('refuseCauseDialog') refuseCauseDialog;

  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';

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
    private configState:ConfigStateService
  ) { }

  frameworkId;
  frameWorkData;

  currentLang;
  userId;


  parentPath;
  showButton = false;

  ngOnInit(): void {
    this.parentPath = this.activatedRoute.snapshot.parent.routeConfig.path;

    this.currentLang = this.localizationService.currentLang;

    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      this.frameWorkData = fram;

      this.showButton = fram.complianceStatus === ComplianceStatus.NotStarted && this.parentPath !== 'compliance-assessment';
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
        let toDeleteIds = [];
        for(let key in this.selectedToDelete) {
          if(this.selectedToDelete[key]) toDeleteIds.push(key)
        }
        this.domainService.deleteManyByIds(toDeleteIds).subscribe(r => {
          this.getMainDomainsList();
        })
      }
    });
  }


  mainDomainsItems;
  allReadyForRevision = true;
  getMainDomainsList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getListWithoutPaging({ ...query, isMainDomain: true, search: search, frameworkId: this.frameworkId, maxResultCount:null });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainDomainsItems = response.items;
      response.items.map(item => {
        if(item.complianceStatus !== ComplianceStatus.ReadyForRevision) this.allReadyForRevision = false;
      });
      this.selectedToDelete = {};
      this.deleteLength = 0;
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
    if(this.frameWorkData.attachmentId) return;

    this.frameWorkData.attachmentId = attachmentId;

    let data = {...this.frameWorkData};

    if (data.frameworkEmpsDto) data.frameworkEmpsDto = data.frameworkEmpsDto.map(emp => {
      return {
        employeeId: emp.employeeId,
        frameworkId: this.frameWorkData?.id ? this.frameWorkData?.id : '00000000-0000-0000-0000-000000000000',
      };
    });
    this.frameworkService.update(this.frameWorkData.id, data).subscribe(r => {
      this.frameWorkData = r;
    })
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

  sendForInternalAssessment() {
    this.frameworkService.sendForInternalAssessmentById(this.frameWorkData.id).subscribe(r => window.location.reload());
  }


  startInternalAssessmentById(mainDomain) {
    this.domainService.startInternalAssessmentById(mainDomain.id).subscribe(r => {
      mainDomain.complianceStatus = ComplianceStatus.UnderInternalAssessment;
    })
  }

  endInternalAssessmentById(mainDomain) {
    this.domainService.endInternalAssessmentById(mainDomain.id).subscribe(r => {
      mainDomain.complianceStatus = ComplianceStatus.ReadyForRevision;
    })
  }

  startReview(mainDomain) {
    this.domainService.startReviewById(mainDomain.id).subscribe(r => {
      mainDomain.complianceStatus = ComplianceStatus.UnderRevision;
    })
  }
}
