import { DepartmentService } from '../proxy/departments/department.service';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '@proxy/departments/dtos';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;


  items: DepartmentDto[];
  totalCount: number;
  departments: DepartmentDto[];
  isModalOpen: boolean = false;
  selected = {} as any;
  form: FormGroup;
  

  constructor(
    public readonly list: ListService,
    private departmentService: DepartmentService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
  ) { }


  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.departmentService.getList({...query, search:search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: DepartmentDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.departmentService.delete(model.id).subscribe(() => this.list.get());
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
      ? this.departmentService.update(this.selected.id, this.form.value)
      : this.departmentService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
