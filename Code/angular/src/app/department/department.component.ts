import { DepartmentService } from '../proxy/departments/department.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;

  constructor(
    public readonly list: ListService,
    private departmentService:DepartmentService,
    public  dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router:Router,
  ) { }

  items
  totalCount
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    const bookStreamCreator = (query) => this.departmentService.getList(query);
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }


 
  delete(id: string) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.departmentService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  activate(ev) {
    if(ev.type === 'click') this.router.navigate(['/framework', ev.row.id])
  }



  isModalOpen = false;
  selected
  openDialog(data = {}) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  // add buildForm method
  form
  buildForm() {
    this.form =  new FormGroup({
      name: new FormControl(null, Validators.required),
      id:new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected.id
      ? this.departmentService.update(this.selected.id, this.form.value)
      : this.departmentService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
