import { ListService } from '@abp/ng.core';
import { IdentityUserService} from '@abp/ng.identity/proxy';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  @ViewChild('permissionsDialog') permissionsDialog;
  @ViewChild('userDialog') userDialog;

  searchVal;
  constructor(
    private identityUserService:IdentityUserService,
    public list:ListService,
    private confirmation:ConfirmationService,
    private toasterService:ToasterService,
    private matDialog:MatDialog

  ) { }

  allRoles;
  ngOnInit(): void {
    this.getList();

    this.identityUserService.getAssignableRoles().subscribe(r => {
      this.allRoles = r.items;
    })

  }

  items;
  totalCount
  getList() {
    const streamCreator = (query) => this.identityUserService.getList({ ...query, search: this.searchVal});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model) {
    this.confirmation.warn('::ConfirmationDeleteMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.identityUserService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }



  openUserModel(data = null) {
    let ref = this.matDialog.open(this.userDialog, {
      data:{
        data,
      },
      maxWidth:750,
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }


  providerKey
  openPermissionsModal(providerKey: string) {
    this.providerKey = providerKey;
    
    let ref = this.matDialog.open(this.permissionsDialog, {
      data:{
        data:{
          providerName: 'U',
          providerKey: providerKey,
          hideBadges: true
        },
      },
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
    // setTimeout(() => {
    //   this.visiblePermissions = true;
    // }, 0);
  }

}
