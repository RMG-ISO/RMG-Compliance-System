import { DepartmentService } from '../../proxy/departments/department.service';
import { EmployeeService } from '../../proxy/employees/employee.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormMode } from '../../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDto } from '@proxy/employees/dtos';
import { DepartmentDto } from '@proxy/departments/dtos';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers:[ListService]
})
export class EmployeeComponent implements OnInit {
  FormMode = FormMode;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;

  items: EmployeeDto[];
  totalCount: number;
  departments: DepartmentDto[];
  isModalOpen:boolean = false;
  selected;
  form: FormGroup;

  
  constructor(
    public readonly list: ListService,
    private employeeService: EmployeeService,
    private confirmation: ConfirmationService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.departmentService.getDepartmentListLookup().subscribe(r => this.departments = r.items)
  }

  getList(search = null) {
    const streamCreator = (query) =>  this.employeeService.getList({...query,search:search});

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }



  delete(model: EmployeeDto) {
    this.confirmation.warn('::EmployeeDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.fullName]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.employeeService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  openDialog(data: EmployeeDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }


  buildForm() {
    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl({value:null, disabled:true}, [Validators.required, Validators.email]),
      departmentId: new FormControl(null, Validators.required),
      isManager: new FormControl(false, Validators.required),
    })
    this.form.patchValue(this.selected);

  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.employeeService.update(this.selected.id, this.form.getRawValue())
      : this.employeeService.create(this.form.getRawValue());

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}