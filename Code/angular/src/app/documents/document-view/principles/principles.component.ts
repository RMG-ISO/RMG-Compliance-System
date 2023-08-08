import { ConfigStateService, ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService, DocumentStatus, PrincipleService, PrincipleStatus } from '@proxy/documents';
import { DocumentDto, PrincipleDto } from '@proxy/documents/dtos';
import { EmployeeService } from '@proxy/employees';
import { DocumentViewComponent } from '../document-view.component';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ControlService } from '@proxy/controls';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-principles',
  templateUrl: './principles.component.html',
  styleUrls: ['./principles.component.scss'],
  providers:[
    ListService
  ]
})
export class PrinciplesComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('complianceDialog') complianceDialog;
  @ViewChild('table') table: DatatableComponent;

  documentData:DocumentDto;
  parent:DocumentViewComponent;
  ColumnMode = ColumnMode;
  PrincipleStatus = PrincipleStatus;
  FormMode = FormMode;

  

  showSendForEvaluation = false;
  constructor(
    private configStateService:ConfigStateService,
    private router:Router,
    private toasterService:ToasterService,
    private principleService: PrincipleService,
    private employeeService: EmployeeService,
    public  list:ListService,
    private confirmation: ConfirmationService,
    private matDialog:MatDialog,
    private controlService:ControlService,
    private documentService:DocumentService,
    private configService:ConfigStateService
  ) {
    this.getList();
  }

  userId;
  isContributor;

  showStartCompliance;
  showEndCompliance
  ngOnInit(): void {
    this.userId = this.configService.getAll().currentUser.id;
    this.showSendForEvaluation = this.documentData.status == DocumentStatus.Approved && !this.documentData.complianceResponsibleId;

    this.showStartCompliance = this.documentData.complianceResponsibleId && !this.documentData.complianceStartDate;
    this.showEndCompliance = this.documentData.complianceResponsibleId && this.documentData.complianceStartDate;


    this.isContributor = this.documentData.creatorId == this.userId || this.documentData.owners.find(x => x.id == this.userId)
  }
  

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }


  items;
  totalCount;
  employees;
  getList() {
    this.employeeService.getEmployeeListLookup().subscribe(r => this.employees = r.items);
    const streamCreator = (query) => this.principleService.getList({ ...query, documentId:this.documentData.id });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  formsContainers = {};

  toggleExpandRow(row, rowIndex) {
    this.table.rowDetail.toggleExpandRow(row);
    if(!this.formsContainers[row.id]) {
      let form = new FormGroup({
        principleId: new FormControl(row.id),
        status: new FormControl(null),
        isApplicable: new FormControl(null, Validators.required),
        comment: new FormControl(null),
        score: new FormControl(0),
        attachmentId: new FormControl(null),
        rowIndex: new FormControl(rowIndex)
      });
      console.log(row);
      let data = {...row};
      data.isApplicable = data.complianceStatus !== null ? +!!data.complianceStatus : data.complianceStatus;
      data.score = data.complianceScore;
      data.comment = data.complianceComment;
      data.rowIndex = rowIndex;
      data.status = data.complianceStatus;

      form.patchValue(data);

      if(this.documentData.complianceResponsibleId !== this.userId) form.disable();
      this.formsContainers[row.id] = form;
    } else this.formsContainers[row.id].controls.rowIndex.setValue(rowIndex)
  }

  afterSend(data:{form:FormGroup, response:PrincipleDto}) {
    // console.log(form);
    data.form;
    this.items[data.form.value.rowIndex] = data.response;
  }

  delete(model: PrincipleDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [ model.name] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.principleService.delete(model.id).subscribe( () => this.list.get() );
      }
    });
  }

  openDialog(mode = FormMode.Create, data = null) {
    let ref = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      },
      maxWidth:750,
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }



  openComplianceDialog() {
    let ref = this.matDialog.open(this.complianceDialog, {
      maxWidth:750,
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      console.log('con', con)
      if(con) this.parent.getDocument();
    })
  }

}
