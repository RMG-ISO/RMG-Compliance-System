import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalAuditChecklistService } from '@proxy/InternalAuditQuestionList/InternalAuditQuestionList.service';
import { InternalAuditQuestionsService } from '@proxy/InternalAuditQuestions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService,
  ]
})
export class ListComponent implements OnInit {
  searchVal;
  items;
  totalCount
  constructor(
    public list:ListService,
    private internalAuditChecklistService:InternalAuditChecklistService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.internalAuditChecklistService.getList({ ...query, Search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  openDialog(row) {
    this.router.navigate(['/internal-audit/checklists', row.id])
  }
}
