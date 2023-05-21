import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { SharedStatus } from '@proxy/shared';
import { filter, map } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.scss'],
  providers:[
    ListService
  ]
})
export class FrameworkViewComponent implements OnInit {
  @ViewChild('frameDialog') frameDialog;
  @ViewChild('domainDialog') domainDialog;
  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';

  constructor(
    public activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private router:Router,
    private domainService: DomainService,
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService
  ) { }

  frameworkId;
  frameWorkData;

  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      console.log(fram);
      this.frameWorkData = fram;
      this.getMainDomainsList();
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


  mainDomainsItems;
  getMainDomainsList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: true, search: search, frameworkId: this.frameworkId, maxResultCount:null });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainDomainsItems = response.items;
      this.selectedToDelete = {};
      this.deleteLength = 0;
      // this.totalCount = response.totalCount;
    });
  }


  openFrameDialog(mode = FormMode.Create) {
    let ref = this.matDialog.open(this.frameDialog, {
      data:{
        data:this.frameWorkData,
        mode
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameWorkData = con;
        this.list.get();
      }
    })
  }
  

  openDomainDialog(data = null, mode = FormMode.Create, mainDomain, subDomainsTable) {
    let ref = this.matDialog.open(this.domainDialog, {
      data:{
        data,
        mode,
        mainDomain
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        if(subDomainsTable) subDomainsTable.list.get();
        else this.list.get();
      }
    })
  }

}
