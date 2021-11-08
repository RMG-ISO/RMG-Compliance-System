import { FrameworkService } from './../proxy/frameworks/framework.service';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { MatDialog } from '@angular/material/dialog';
import { AddFrameworkComponent } from './add-framework/add-framework.component';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<AddFrameworkComponent>;
  FormMode = FormMode;

  constructor(
    public readonly list: ListService,
    private frameworkService:FrameworkService,
    public  dialog: MatDialog,
    private confirmation: ConfirmationService,
  ) { }

  source = { items: [], totalCount: 0 } as PagedResultDto<FrameworkDto>;

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    const bookStreamCreator = (query) => this.frameworkService.getList(query);
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.source = response;
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
  
}
