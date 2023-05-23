import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from '@proxy/controls';
import { DomainService } from '@proxy/domains';
import { SharedStatus } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.scss'],
  providers:[
    ListService
  ]
})
export class DomainViewComponent implements OnInit {
  @ViewChild('domainDialog') domainDialog;
  @ViewChild('controlDialog') controlDialog;

  SharedStatus = SharedStatus;
  FormMode = FormMode;

  constructor(
    public activatedRoute:ActivatedRoute,
    private router:Router,
    private domainService: DomainService,
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private controlService: ControlService,

  ) { }

  subDomainId;
  subDomainData;
    mainDomainData;
  ngOnInit(): void {
    this.subDomainId = this.activatedRoute.snapshot.params.subDomainId;
    this.domainService.get(this.subDomainId).subscribe(res => {
      console.log(res);
      this.subDomainData = res;
      this.domainService.get(res.parentId).subscribe(r => {
        this.mainDomainData = r;
      })
      this.getMainControlsList();
    });

  }

  selectedToDelete = {};
  deleteLength = 0;
  selectChanged(checked, id){
    this.selectedToDelete[id] = checked;
    this.deleteLength = checked ? this.deleteLength + 1 : this.deleteLength - 1;
    console.log(checked);
  }

  deleteItems(){
    // deleteSelectedItem
    this.confirmation.warn('::DeleteSelectedItem', '::AreYouSure')
    .subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        // this.domainService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }


  mainControlsItems;
  getMainControlsList(search = null) {
    const bookStreamCreator = (query) => this.controlService.getList({ ...query, isMainControl: true, search: search, domainId: this.subDomainId, maxResultCount:null });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainControlsItems = response.items;
      this.selectedToDelete = {};
      this.deleteLength = 0;
      // this.totalCount = response.totalCount;
    });
  }


  openDomainDialog(mode = FormMode.Create) {
    let ref = this.matDialog.open(this.domainDialog, {
      data:{
        data:this.subDomainData,
        mode
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.subDomainData = con;
        this.list.get();
      }
    })
  }
  

  openControlDialog(data = null, mode = FormMode.Create, mainControl, subControlsTable) {
    let ref = this.matDialog.open(this.controlDialog, {
      data:{
        data,
        mode,
        mainControl
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        if(subControlsTable) subControlsTable.list.get();
        else this.list.get();
      }
    })
  }

}
