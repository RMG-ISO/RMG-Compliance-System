import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { DomainDto } from '@proxy/domains/dtos';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-expansion-sub-domains-table',
  templateUrl: './expansion-sub-domains-table.component.html',
  styleUrls: ['./expansion-sub-domains-table.component.scss'],
  providers:[
    ListService
  ]
})
export class ExpansionSubDomainsTableComponent implements OnInit, OnChanges {
  @ViewChild('domainDialog') domainDialog;
  
  @Input('frameworkId') frameworkId;
  @Input('mainDomain') mainDomain;
  @Input('expanded') expanded;
  @Input('frameWorkData') frameWorkData;
  @Input('inAssessment') inAssessment;
  
  constructor(
    private domainService:DomainService,
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation:ConfirmationService,
    private localizationService:LocalizationService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  
  isExpanded = false;
  ngOnChanges(): void {
    if(this.isExpanded) return;

    if(this.expanded) {
      this.isExpanded = true;
      this.getList();
    }
  }


  delete(model: DomainDto) {
    this.confirmation
      .warn('::DomainDeletionConfirmationMessage', '::AreYouSure', {
        messageLocalizationParams: [
          this.localizationService.currentLang.includes('ar') ? model.nameAr : model.nameEn,
        ],
      })
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.domainService.delete(model.id).subscribe(() => this.list.get());
        }
      });
  }


  openDomainDialog(data = null) {
    let ref = this.matDialog.open(this.domainDialog, {
      data:{
        data,
        mode:FormMode.Edit,
        mainDomain:this.mainDomain
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }



  items
  totalCount;
  getList() {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: false, mainDomainId: this.mainDomain.id, frameworkId: this.frameworkId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  activate(ev) {
    if (ev.type === 'click') {
      this.router.navigate(['/frameworks', 'sub-domains', ev.row.id, 'controls'])
      console.log(ev.row);
    }
    
  }

}
