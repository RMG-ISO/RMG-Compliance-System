import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { eIdentityComponents, RolesComponent, UsersComponent } from '@abp/ng.identity';
import { IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps
} from '@abp/ng.theme.shared/extensions';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { GetIdentityUsersInput, IdentityUserDto, IdentityUserService } from '@abp/ng.identity/proxy';
import { TemplateRef, TrackByFunction } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationService, eFormComponets, ToasterService } from '@abp/ng.theme.shared';
import { Confirmation, getPasswordValidators, ThemeSharedModule } from '@abp/ng.theme.shared';
import { tap, switchMap, map, mapTo } from 'rxjs/operators';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Users,
    },
    { 
      provide: UsersComponent, 
      useExisting: MyUsersComponent 
    }
  ],
})
export class MyUsersComponent implements OnInit {
    @ViewChild('permissionsDialog') permissionsDialog;

    
    //roleGroups;
   /*  protected confirmationService: ConfirmationService; */
    /* protected fb: UntypedFormBuilder; */
    data: PagedResultDto<IdentityUserDto> = { items: [], totalCount: 0 };
    modalContent: TemplateRef<any>;
    form: FormGroup<any>;
    selected?: IdentityUserDto;
  /*   selected; */
    selectedUserRoles?: IdentityRoleDto[];
    roles?: IdentityRoleDto[];
    providerKey?: string;
    isModalVisible?: boolean;
    modalBusy: boolean;
  permissionManagementKey = ePermissionManagementComponents.PermissionManagement;
    entityDisplayName: string;
    inputKey: eFormComponets;
    trackByFn: TrackByFunction<AbstractControl> = (index, item) => Object.keys(item)[0] || index;;
    onVisiblePermissionChange: (event: boolean) => void;

    constructor(
      public readonly list: ListService<PagedAndSortedResultRequestDto>,
      protected injector: Injector,
      protected service: IdentityUserService,
      protected confirmationService: ConfirmationService,
      private fb: FormBuilder,
      protected toasterService: ToasterService,
      private matDialog:MatDialog,
      ){
    }

    ngOnInit() {
      this.hookToQuery();
      
    }

    buildForm() {
        const data = new FormPropData(this.injector, this.selected);
        console.log(data);
        this.form = generateFormFromProps(data);
        console.log(this.form.errors);

        this.service.getAssignableRoles().subscribe(({ items }) => {
            this.roles = items;
            if (this.roles) {
                this.form.addControl('roleNames', this.fb.array(this.roles.map(role => this.fb.group({
                    [role.name]: [
                        this.selected?.id
                            ? !!this.selectedUserRoles?.find(userRole => userRole.id === role.id)
                            : role.isDefault,
                    ],
                }))));
            }
        });
    }

    get roleGroups() {
        return (this.form.get('roleNames') as FormArray).controls;
    }

    
    openModal() {
        this.buildForm();
        this.isModalVisible = true;
    }

    add() {
        this.selected = null;
        this.selectedUserRoles = [];
        this.openModal();
    }

    edit(id) {
     this.service
            .get(id)
            .pipe(tap(user => (this.selected = user)), switchMap(() => this.service.getRoles(id)))
            .subscribe(userRole => {
                this.selectedUserRoles = userRole.items || [];
                this.openModal();
            }); 
    }

    save() {
        console.log(this.form);
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
        }
       
        console.log(invalid);

        if (!this.form.valid || this.modalBusy)
            return;
        this.modalBusy = true;
        const { roleNames = [] } = this.form.value;
        const mappedRoleNames = roleNames
            .filter((role) => !!role[Object.keys(role)[0]])
            .map((role) => Object.keys(role)[0]) || [];
        const { id } = this.selected || {};
        (id
            ? this.service.update(id, {
                ...this.selected,
                ...this.form.value,
                roleNames: mappedRoleNames,
            })
            : this.service.create({ ...this.form.value, roleNames: mappedRoleNames }))
            .pipe(finalize(() => (this.modalBusy = false)))
            .subscribe(() => {
            this.isModalVisible = false;
            this.list.get();
        });
    }

    delete(id, userName) {
        this.confirmationService
            .warn('AbpIdentity::UserDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
            messageLocalizationParams: [userName],
        })
            .subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.service.delete(id).subscribe(() => {
                    this.toasterService.success('AbpUi::SuccessfullyDeleted');
                    this.list.get();
                });
            }
        });
    }

    sort(data) {
        const { prop, dir } = data.sorts[0];
        this.list.sortKey = prop;
        this.list.sortOrder = dir;
    }
    
    hookToQuery() {
        this.list.hookToQuery(query => this.service.getList(query)).subscribe(res => (this.data = res));
    }

    // openPermissionsModal(providerKey, entityDisplayName) {
    //     this.providerKey = providerKey;
    //     this.entityDisplayName = entityDisplayName;
    //     setTimeout(() => {
    //         this.visiblePermissions = true;
    //     }, 0);
    // }

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

