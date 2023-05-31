import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { ComplianceStatus, FrameworkStatus, SharedStatus, sharedStatusOptions } from '@proxy/shared';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;

  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  items: FrameworkDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected: FrameworkDto;
  form: FormGroup;

  visibleContent:string = 'grid';

  ComplianceStatus = ComplianceStatus;

  constructor(
    public readonly list: ListService,
    private frameworkService: FrameworkService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private localizationService: LocalizationService,
    private configService:ConfigStateService
  ) { }


  userId;
  ngOnInit(): void {
    this.getList();
    this.userId = this.configService.getAll().currentUser.id;

  }

  showFilters = false;
  getList(search = null) {
    const streamCreator = (query) => this.frameworkService.getList({
      ...query,
      search:search,
      status: SharedStatus.Active,
      frameworkStatus: FrameworkStatus.Approved
    });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }


  activate(ev) {
    if (ev.type === 'click') this.router.navigate(['/compliance-assessment', ev.row.id]);
  }


  openDialog(data = null) {
    console.log('data', data)
    let ref = this.matDialog.open(this.dialog, {
      data:{
        data,
      },
      disableClose:true,
      panelClass:'app-dialog'
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameworkService.startSelfAssessmentById(data.id).subscribe(r => {
          this.list.get();
        })
      }
    })
  }



}
