import { ListService } from '@abp/ng.core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomainService } from '@proxy/domains';

@Component({
  selector: 'app-expansion-sub-domains-table',
  templateUrl: './expansion-sub-domains-table.component.html',
  styleUrls: ['./expansion-sub-domains-table.component.scss'],
  providers:[
    ListService
  ]
})
export class ExpansionSubDomainsTableComponent implements OnInit, OnChanges {
  @Input('frameworkId') frameworkId;
  @Input('mainDomainId') mainDomainId;
  @Input('expanded') expanded;
  
  constructor(
    private domainService:DomainService,
    public readonly list: ListService,
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

  items
  totalCount;
  getList() {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: false, mainDomainId: this.mainDomainId, frameworkId: this.frameworkId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  activate(ev) {
    if (ev.type === 'click') console.log(ev.row);
    
  }

}
