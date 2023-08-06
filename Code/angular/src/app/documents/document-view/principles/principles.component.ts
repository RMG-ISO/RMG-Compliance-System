import { ConfigStateService, ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipleService, PrincipleStatus } from '@proxy/documents';
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
export class PrinciplesComponent {
  @ViewChild('dialog') dialog;
  @ViewChild('table') table: DatatableComponent;

  documentData:DocumentDto;
  parent:DocumentViewComponent;
  ColumnMode = ColumnMode;
  PrincipleStatus = PrincipleStatus;
  FormMode = FormMode;

  
  constructor(
    private configStateService:ConfigStateService,
    private router:Router,
    private toasterService:ToasterService,
    private principleService: PrincipleService,
    private employeeService: EmployeeService,
    public  list:ListService,
    private confirmation: ConfirmationService,
    private matDialog:MatDialog,
    private controlService:ControlService
  ) {
    this.getList();
  }
  

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }


  items;
  totalCount;
  getList() {
    const streamCreator = (query) => this.principleService.getList({ ...query, documentId:this.documentData.id });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  formsContainers = {};

  toggleExpandRow(row, event) {
    console.log('toggleExpanf', row);
    this.table.rowDetail.toggleExpandRow(row);
    if(!this.formsContainers[row.id]) {
      this.formsContainers[row.id] = new FormGroup({
        principleId: new FormControl(row.id),
        status: new FormControl(null),
        isApplicable: new FormControl(null),
        comment: new FormControl(null),
        score: new FormControl(null),
        attachmentId: new FormControl(null),
      })
    }
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




}
