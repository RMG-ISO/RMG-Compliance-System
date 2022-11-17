import { ListService } from '@abp/ng.core';
import { IdentityUserService } from '@abp/ng.identity';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  searchVal;
  constructor(
    private identityUserService:IdentityUserService,
    public list:ListService,
    private confirmation:ConfirmationService,
    private toasterService:ToasterService

  ) { }

  ngOnInit(): void {
    this.getList();
  }

  items;
  totalCount
  getList(search = null) {
    const streamCreator = (query) => this.identityUserService.getList({ ...query, search: search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      console.log(response);
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model) {
    console.log(model)
    let title = "this.localizationService.currentLang.includes('ar') ?  model['questionTextAr'] : model['questionTextEn']";
    this.confirmation.warn('::DomainDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.identityUserService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }

}
