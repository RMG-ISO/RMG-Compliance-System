import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { DocumentService } from '@proxy/documents';
import { EmployeeService } from '@proxy/employees';
import { documentTypeOptions } from '@proxy/documents/document-type.enum';
import {  DocumentStatus  } from '@proxy/documents/document-status.enum';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  providers:[ListService]
})
export class DocumentViewComponent {
  DocumentStatus = DocumentStatus;

  constructor(
    public  activatedRoute:ActivatedRoute,
    private router:Router,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService,
    private toasterService:ToasterService,
    private documentService: DocumentService,
    private employeeService: EmployeeService,

  ) { }

  allEmployees;
  documentId;
  documentData;
  employeesObj = {};
  ngOnInit(): void {
    this.documentId = this.activatedRoute.snapshot.params.documentId;
    this.getDocument();
  }
 
  getDocument() {
    this.documentData = null;
    this.documentService.get(this.documentId).subscribe(data => {
      this.documentData = data;
      this.employeeService.getEmployeeListLookup().subscribe(result => {
        result.items.map(x => this.employeesObj[x.id]=x.fullName)
        this.allEmployees = result.items;
        //this.documentOwners = this.filterArray(this.allEmployees,this.documentData['ownersIds']);
      });
    });
  }

  activeComponent;
  changeRoute(component) {
    this.activeComponent = component;
    component.documentData = this.documentData;
    component.employeesObj = this.employeesObj;
    component.parent = this;
  }
  
}
