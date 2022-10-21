import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
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
  searchVal
  constructor(
    public list:ListService,
    private internalAuditQuestionsService:InternalAuditQuestionsService,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {

  }
}
