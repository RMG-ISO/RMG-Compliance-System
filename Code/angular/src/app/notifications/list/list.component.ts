import { Confirmation } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  // constructor(
  //   private riskAndOpportunityService:RiskAndOpportunityService,
  //   public readonly list: ListService,
  //   public dialog: MatDialog,
  //   private confirmation: ConfirmationService,
  //   private localizationService:LocalizationService,
  //   private configState:ConfigStateService
  // ) { }

  // ngOnInit(): void {
  //   this.getList();
  // }

  // searchVal
  // items
  // totalCount;
  // getList() {
  //   const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: this.searchVal });
  //   this.list.hookToQuery(streamCreator).subscribe((response) => {
  //     this.items = response.items;
  //     this.totalCount = response.totalCount;
  //   });
  // }

  // delete(model: any) {
  //   let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];

  //   this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
  //     if (status === Confirmation.Status.confirm) {
  //       this.riskAndOpportunityService.delete(model.id).subscribe(() => {
  //         this.list.get();

  //         let obj:any = {
  //           actionDate:moment().toISOString(),
  //           actionName: HistoryAction.Delete,
  //           riskAndOpportunityId: model.id,
  //           userId: this.configState.getAll().currentUser.id,
  //           workFlowStages: null,
  //         }
      
  //         // this.riskAndOpportunityService.createhistoryRisk(obj).subscribe(r => { })

  //       });
  //     }
  //   });
  // }

}
