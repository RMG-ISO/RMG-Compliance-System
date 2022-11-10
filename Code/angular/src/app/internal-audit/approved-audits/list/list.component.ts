import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService
  ]
})
export class ListComponent implements OnInit {
  searchVal;

  constructor(
    public  list:ListService,
    private internalAuditPreparationService:InternalAuditPreparationService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  items;
  totalCount
  getList(search = null) {
    const streamCreator = (query) => this.internalAuditPreparationService.getList({ ...query, Search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(response);
    });
  }

}
