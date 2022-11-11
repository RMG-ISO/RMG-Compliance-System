import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
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
  searchVal = null;

  constructor(
    public  list:ListService,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private confirmation:ConfirmationService,
    private localizationService:LocalizationService,
    private toasterService:ToasterService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  
  items;
  totalCount
  getList() {
    const streamCreator = (query) => this.internalAuditPreparationService.getList({ ...query, Search: this.searchVal });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(response);
    });
  }

  delete(model) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['questionTextAr'] : model['questionTextEn'];
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.internalAuditPreparationService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }

}
