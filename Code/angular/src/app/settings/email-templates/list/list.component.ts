import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { EmailTemplateService } from '@proxy/email-templates';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  constructor(
    public readonly list: ListService,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private emailTemplateService:EmailTemplateService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  searchVal;
  items
  totalCount;
  getList() {
    const streamCreator = (query) => this.emailTemplateService.getList({ ...query, search: this.searchVal });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: any) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['key'] : model['key'];

    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.emailTemplateService.delete(model.id).subscribe(() => {
          this.list.get();
        });
      }
    });
  }

}
