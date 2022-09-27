import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService, Status } from '@proxy/notifications';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent {
  Status = Status;
  constructor(
    private notificationService:NotificationService,
    public readonly list: ListService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  searchVal
  items
  totalCount;
  getList() {
    const streamCreator = (query) => this.notificationService.getListCurrentUserNotifications({ ...query, sorting: 'creationtime desc', });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      console.log(response)
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: any) {
    // let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];

    // this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
    //   if (status === Confirmation.Status.confirm) {
    //     this.notificationService.delete(model.id).subscribe(() => {
    //       this.list.get();

    //       let obj:any = {
    //         actionDate:moment().toISOString(),
    //         actionName: HistoryAction.Delete,
    //         riskAndOpportunityId: model.id,
    //         userId: this.configState.getAll().currentUser.id,
    //         workFlowStages: null,
    //       }
      
    //       // this.riskAndOpportunityService.createhistoryRisk(obj).subscribe(r => { })

    //     });
    //   }
    // });
  }

  markAsRead(row, index) {
    console.log(index)
    console.log(row)
    console.log(Status)
    if(row.status == Status.NotSeen) this.notificationService.markAsSeenById(row.id).subscribe(r => {
      row.status = Status.Seen;
      console.log('seem')
    });
    this.router.navigate([row.url]);
  }


}
