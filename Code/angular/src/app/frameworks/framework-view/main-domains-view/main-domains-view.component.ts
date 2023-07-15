import { ConfigStateService, ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { ComplianceStatus, SharedStatus } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { Location } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-domains-view',
  templateUrl: './main-domains-view.component.html',
  styleUrls: ['./main-domains-view.component.scss'],
  providers: [ListService],
})
export class MainDomainsViewComponent implements OnInit {
  @ViewChild('domainDialog') domainDialog;
  @ViewChild('domainDetailsDialog') domainDetailsDialog;
  @ViewChild('reviewAlert') reviewAlert;
  @ViewChild('reviewDecisionAlert') reviewDecisionAlert;

  frameWorkData;
  SharedStatus = SharedStatus;
  ComplianceStatus = ComplianceStatus;
  FormMode = FormMode;

  constructor(
    private domainService: DomainService,
    private confirmation: ConfirmationService,
    public readonly list: ListService,
    public matDialog: MatDialog,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private location:Location,
    private configState:ConfigStateService,
    private toasterService:ToasterService
  ) {}

  showButton = false;
  expandedDomainId;
  userId;
  inCompliance;
  ngOnInit(): void {
    this.userId = this.configState.getAll().currentUser.id
    this.expandedDomainId = this.activatedRoute.snapshot.queryParams.expandedDomainId;

    this.inCompliance = this.frameWorkData.parentPath == 'compliance-assessment';

    this.showButton =
      this.frameWorkData.complianceStatus === ComplianceStatus.NotStarted &&
      this.frameWorkData.parentPath !== 'compliance-assessment';
      this.getMainDomainsList();
  }

  mainDomainsItems;
  allReadyForRevision = true;
  allDomainsApproved = true;
  getMainDomainsList(search = null) {
    const bookStreamCreator = query =>
      this.domainService.getListWithoutPaging({
        ...query,
        isMainDomain: true,
        search: search,
        frameworkId: this.frameWorkData.id,
        maxResultCount: null,
      }).pipe(
        map((res => {
          if(this.frameWorkData.parentPath === 'compliance-assessment') res.items = res.items.filter(x => {
            return x.responsibleId == this.userId || this.frameWorkData.ownerId == this.userId;
          } )
          return res
        }))
      );
    this.list.hookToQuery(bookStreamCreator).subscribe(response => {
      this.mainDomainsItems = response.items;
      response.items.map(item => {
        if (item.complianceStatus !== ComplianceStatus.ReadyForRevision)
          this.allReadyForRevision = false;
        if (item.complianceStatus !== ComplianceStatus.Approved) this.allDomainsApproved = false;
      });
      this.selectedToDelete = {};
      this.deleteLength = 0;
    });
  }

  selectedToDelete = {};
  deleteLength = 0;
  selectChanged(checked, id) {
    this.selectedToDelete[id] = checked;
    this.deleteLength = checked ? this.deleteLength + 1 : this.deleteLength - 1;
  }

  deleteItems() {
    // deleteSelectedItem
    this.confirmation.warn('::DeleteSelectedItem', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        let toDeleteIds = [];
        for (let key in this.selectedToDelete) {
          if (this.selectedToDelete[key]) toDeleteIds.push(key);
        }
        this.domainService.deleteManyByIds(toDeleteIds).subscribe(r => {
          this.getMainDomainsList();
        });
      }
    });
  }

  openDomainDialog(data = null, mode = FormMode.Create, mainDomain, subDomainsTable) {
    let ref = this.matDialog.open(this.domainDialog, {
      data: {
        data,
        mode,
        mainDomain,
      },
      disableClose: true,
    });
    ref.afterClosed().subscribe(con => {
      if (con) {
        if (subDomainsTable) subDomainsTable.list.get();
        else this.list.get();
      }
    });
  }

  openDomainDetailsDialog(data) {
    let ref = this.matDialog.open(this.domainDetailsDialog, {
      data: {
       data
      },
     
    });
    ref.afterClosed().subscribe(con => {
    
    });
  }

  startInternalAssessmentById(mainDomain) {
    this.domainService.startInternalAssessmentById(mainDomain.id).subscribe(r => {
      // mainDomain.complianceStatus = ComplianceStatus.UnderInternalAssessment;
      this.toasterService.success('::SuccessfullySaved', "");
      this.getMainDomainsList();
    });
  }

  endInternalAssessmentById(mainDomain) {
    this.domainService.endInternalAssessmentById(mainDomain.id).subscribe(r => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.getMainDomainsList();
      // mainDomain.complianceStatus = ComplianceStatus.ReadyForRevision;
    });
  }

  startReview(mainDomain) {
    let ref = this.matDialog.open(this.reviewAlert, {
      disableClose: true,
      panelClass: ['app-dialog', 'confirm-alert'],
    });

    ref.afterClosed().subscribe(con => {
      if (con) {
        this.domainService.startReviewById(mainDomain.id).subscribe(r => {
          this.toasterService.success('::SuccessfullySaved', "");
          this.getMainDomainsList();
        });
      }
    });
  }

  sendToOwner(mainDomain) {
    this.domainService.sendToOwnerById(mainDomain.id).subscribe(r => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.getMainDomainsList();
    });
  }

  reviewForm: FormGroup;
  takeReviewDecision(mainDomain) {
    this.reviewForm = new FormGroup({
      action: new FormControl(null, Validators.required),
    });

    let ref = this.matDialog.open(this.reviewDecisionAlert, {
      disableClose: true,
      panelClass: ['app-dialog', 'confirm-alert'],
    });

    ref.afterClosed().subscribe(con => {
      if (con) {
        (this.reviewForm.value.action
          ? this.domainService.approveComplianceById(mainDomain.id)
          : this.domainService.returnToResponsibleById(mainDomain.id)
        ).subscribe(r => {
          this.toasterService.success('::SuccessfullySaved', "");
          this.getMainDomainsList();
        });
      }
    });
  }



  expansionOpened(domain) {
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {expandedDomainId: domain.id}}).toString()
    this.location.go(url);
  }
}
