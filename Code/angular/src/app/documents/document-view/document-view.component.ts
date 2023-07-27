import { ListService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '@proxy/Documents';
import { EmployeeService } from '@proxy/employees';
import {  DocumentStatus  } from '@proxy/Documents';


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
    public  matDialog: MatDialog,
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
