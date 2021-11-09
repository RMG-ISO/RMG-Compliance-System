import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
import { FrameworkService } from './../proxy/frameworks/framework.service';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { MatDialog } from '@angular/material/dialog';
import { AddFrameworkComponent } from './add-framework/add-framework.component';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { SharedStatus } from '@proxy/shared';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<AddFrameworkComponent>;
  FormMode = FormMode;
  SharedStatus = SharedStatus;
  @ViewChild('dataTable', { static: false }) table: any;

  constructor(
    public readonly list: ListService,
    private frameworkService:FrameworkService,
    public  dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router:Router,
    private layoutService:LayoutService
  ) { }

  items
  totalCount
  ngOnInit(): void {
    this.getList();
    setTimeout(() => {
      console.log(this.table)
    }, 100)

    this.layoutService.sideNaveToggle.subscribe(r => {
      console.log(r);
      this.items = [...this.items];
      this.table.recalculate()
    })
  }

  getList() {
    const bookStreamCreator = (query) => this.frameworkService.getList(query);
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(response)
    });
  }


  openDialog(data = null, mode = FormMode.Create) {
    console.log(data, mode);
    const dialogRef = this.dialog.open(this.dialogRef, {
      data :{
        data,
        mode
      }
    });
    dialogRef.afterClosed().subscribe(reload => {
      if(reload) this.getList()
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.frameworkService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  activate(ev) {
    if(ev.type === 'click') this.router.navigate(['/framework', ev.row.id])
  }
}
