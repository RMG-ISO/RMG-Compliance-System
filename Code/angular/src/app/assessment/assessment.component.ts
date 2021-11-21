import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
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
    if (ev.type === 'click') this.router.navigate(['/assessment', ev.row.id]);
  }



}
