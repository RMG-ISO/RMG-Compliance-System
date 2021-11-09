import { FrameworkService } from './../proxy/frameworks/framework.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFrameworkComponent } from './add-framework/add-framework.component';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<AddFrameworkComponent>;
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;

  constructor(
    public readonly list: ListService,
    private frameworkService:FrameworkService,
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
    const bookStreamCreator = (query) => this.frameworkService.getList(query);
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      // setInterval(() => {
      //   this.items = [...this.items]
      // }, 100)
      console.log(response)
    });
  }


  // openDialog(data = null, mode = FormMode.Create) {
  //   console.log(data, mode);
  //   const dialogRef = this.dialog.open(this.dialogRef, {
  //     data :{
  //       data,
  //       mode
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(reload => {
  //     if(reload) this.getList()
  //   });
  // }

  delete(id: string) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.frameworkService.delete(id).subscribe(() => this.list.get());
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
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      shortcutAr: new FormControl(null, Validators.required),
      shortcutEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
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
      ? this.frameworkService.update(this.selected.id, this.form.value)
      : this.frameworkService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
