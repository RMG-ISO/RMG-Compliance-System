import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DepartmentService } from '@proxy/departments';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers:[ListService]
})
export class DepartmentComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;
  @ViewChild('departmentDialog') departmentDialog;


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

  search = '';
  getList() {
    const streamCreator = (query) => this.departmentService.getList({...query, search:this.search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: DepartmentDto) {
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.departmentService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  // openDialog(data: DepartmentDto) {
  //   this.selected = data;
  //   this.buildForm();
  //   this.isModalOpen = true;
  // }

  // buildForm() {
  //   this.form = new FormGroup({
  //     name: new FormControl(null, Validators.required),
  //     id: new FormControl(null)
  //   })
  //   this.form.patchValue(this.selected);
  // }
  
  openDialog(data: DepartmentDto) {
    let ref = this.dialog.open(this.departmentDialog, {
      data:{
        data,
      },
      maxWidth:750,
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }



  // save() {
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   const request = this.selected?.id
  //     ? this.departmentService.update(this.selected.id, this.form.value)
  //     : this.departmentService.create(this.form.value);

  //   request.subscribe(() => {
  //     this.isModalOpen = false;
  //     this.form.reset();
  //     this.list.get();
  //   });
  // }

}
