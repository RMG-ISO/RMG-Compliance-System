import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Component({
  selector: 'app-compliance-management',
  templateUrl: './compliance-management.component.html',
  styleUrls: ['./compliance-management.component.scss']
})
export class ComplianceManagementComponent implements OnInit {
  items: FrameworkDto[];
  totalCount: number;

  visibleContent = 'grid';

  constructor(
    public readonly list: ListService,
    private frameworkService: FrameworkService,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.frameworkService.getList({ ...query, search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  activate(ev) {
    if (ev.type === 'click') this.router.navigate(['/compliance', ev.row.id]);
  }



}
