import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { eIdentityComponents, RolesComponent } from '@abp/ng.identity';
import { IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps
} from '@abp/ng.theme.shared/extensions';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';

@Component({
  selector: 'app-my-roles',
  templateUrl: './my-roles.component.html',
  styleUrls: ['my-roles.component.scss'],
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Roles,
    },
    { 
      provide: RolesComponent, 
      useExisting: MyRolesComponent 
    }
  ],
})
export class MyRolesComponent implements OnInit {
  @ViewChild('roleDialog') roleDialog;
  @ViewChild('permissionsDialog') permissionsDialog;


  data: PagedResultDto<IdentityRoleDto> = { items: [], totalCount: 0 };

  permissionManagementKey = ePermissionManagementComponents.PermissionManagement;


  constructor(
    public readonly list: ListService<PagedAndSortedResultRequestDto>,
    protected confirmationService: ConfirmationService,
    protected injector: Injector,
    protected service: IdentityRoleService,
    private matDialog:MatDialog
  ) {}

  ngOnInit() {
    this.getList();
  }

  private getList() {
    this.list.hookToQuery(query => this.service.getList(query)).subscribe(res => {
      this.data = res;
      console.log(res);
    });
  }

  openRoleModel(data = null) {
    let ref = this.matDialog.open(this.roleDialog, {
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
            providerName: 'R',
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

  delete(id: string, name: string) {
    this.confirmationService
    .warn('AbpIdentity::RoleDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
      messageLocalizationParams: [name],
    })
    .subscribe((status: Confirmation.Status) => {
      if (status === Confirmation.Status.confirm) {
        this.service.delete(id).subscribe(() => this.list.get());
      }
    });
  }



  


  sort(data) {
    const { prop, dir } = data.sorts[0];
    this.list.sortKey = prop;
    this.list.sortOrder = dir;
  }
}

