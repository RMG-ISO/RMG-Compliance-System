import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { PolicyService } from '@proxy/policies';
import { EmployeeService } from '@proxy/employees';
import { policyTypeOptions } from '@proxy/policies/policy-type.enum';
import {  PolicyStatus  } from '@proxy/policies/policy-status.enum';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent {
  PolicyStatus = PolicyStatus;

  constructor(
    public  activatedRoute:ActivatedRoute,
    private router:Router,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService,
    private toasterService:ToasterService,
    private policyService: PolicyService,

  ) { }

  documentId;
  ngOnInit(): void {
    this.documentId = this.activatedRoute.snapshot.params.documentId;
    this.getDocument();
  }

  documentData;
  getDocument() {
    this.documentData = null;
    this.policyService.get(this.documentId).subscribe(data => {
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
