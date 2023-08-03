import { ListService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '@proxy/documents';
import {  DocumentStatus  } from '@proxy/documents';


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
    });
  }

  activeComponent;
  changeRoute(component) {
    this.activeComponent = component;
    component.documentData = this.documentData;
    component.parent = this;
  }
  
}
