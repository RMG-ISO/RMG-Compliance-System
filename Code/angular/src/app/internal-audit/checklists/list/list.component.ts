import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalAuditChecklistService } from '@proxy/InternalAuditQuestionList/InternalAuditQuestionList.service';

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
    private confirmation:ConfirmationService,
    private localizationService:LocalizationService,
    private toasterService:ToasterService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.internalAuditChecklistService.getList({ ...query, search: search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {

      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['questionTextAr'] : model['questionTextEn'];
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.internalAuditChecklistService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }
}
