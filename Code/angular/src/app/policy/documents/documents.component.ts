import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DepartmentService } from '@proxy/departments';
import { PolicyService } from '@proxy/policies';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { EmployeeService } from '@proxy/employees';
import {  PolicyStatus  } from '@proxy/policies/policy-status.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { policyTypeOptions } from '@proxy/policies/policy-type.enum';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers:[ListService]

})
export class DocumentsComponent {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;


  items: DepartmentDto[];
  totalCount: number;
  departments: DepartmentDto[];
  isModalOpen: boolean = false;
  selected = {} as any;
  form: FormGroup;
  allEmployees;
  PolicyStatus = PolicyStatus;
  PolicyType = policyTypeOptions;
  constructor(
    public readonly list: ListService,
    private policyService: PolicyService,
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private confirmation: ConfirmationService,
    public  activatedRoute:ActivatedRoute,
    private toasterService:ToasterService,

  ) { }

  documentId;
  ngOnInit(): void {
    this.getList();
  
  }

  getList(search = null) {
    const streamCreator = (query) => this.policyService.getList({...query, search:search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: DepartmentDto) {
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.policyService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }

  openDialog(data: DepartmentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.policyService.update(this.selected.id, this.form.value)
      : this.policyService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}