import { CoreModule, LocalizationService } from '@abp/ng.core';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PermissionsService } from '@abp/ng.permission-management/proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { Subscription, distinctUntilChanged, finalize } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-permissions-management',
  templateUrl: './permissions-management.component.html',
  styleUrls: ['./permissions-management.component.scss'],
  host: { class:'app-dialog' },
  standalone:true,
  imports:[MatDialogModule,MatButtonModule,MatExpansionModule, MatIconModule, CoreModule, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
})
export class PermissionsManagementComponent {
  @Input('id') id;
  @Input('providerName') providerName = 'U';
  @Input('ref') ref;
  @Input('cardTitle') cardTitle;
  
  form:FormGroup;
  constructor(
    private permissionsService: PermissionsService,
    private toasterService: ToasterService,
    private localization:LocalizationService
  ) {
    this.form = new FormGroup({
      groups: new FormArray([]),
      isGranted: new FormControl(),
    });
  }

  someOfAllGranted = false;
  activeGroupForm;

  ngOnInit(): void {
    this.permissionsService.get(this.providerName, this.id).subscribe(r => {
      let groups = this.setGroups(r.groups);
      groups.map(g => this.addGroup(g));
      this.activeGroupForm = this.form.controls.groups['controls'][0];
    });
  }

  
  setGroups(temp2) {
    let groups = [];
    for (let g of temp2) {
      let subGroup = {
        displayName: g.displayName,
        name: g.name,
        subGroups: {},
      };
      for (let permission of g.permissions) {
        if (!permission.parentName) {
          subGroup['subGroups'][permission.name] = {
            name: permission.name,
            displayName: permission.displayName,
            isGranted: permission.isGranted,
            permissions: [
              {
                name: permission.name,
                displayName: permission.displayName,
                isGranted: permission.isGranted,
                grantedProviders:permission.grantedProviders
              }
            ],
            grantedProviders:permission.grantedProviders
          };
        } else {
          subGroup['subGroups'][permission.parentName].permissions.push(permission);
        }
      }
      let tempPermissions = [];
      for (let p in subGroup.subGroups) {
        tempPermissions.push(subGroup.subGroups[p]);
      }
      subGroup.subGroups = tempPermissions;
      groups.push(subGroup);
    }
    return groups;
  }

  formSubscriptions: Subscription[] = [];
  // permissions = {};
  addGroup(data) {
    let group = new FormGroup({
      displayName: new FormControl(data.displayName),
      name: new FormControl(data.name),
      isGranted: new FormControl(false),
      indeterminate: new FormControl(),
      subGroups: new FormArray([]),
      checkedCount:new FormControl()
    });
    (this.form.controls.groups as FormArray).push(group);

    data.subGroups.map(sub => {
      let parent = new FormGroup({
        displayName: new FormControl(sub.displayName),
        name: new FormControl(sub.name),
        isGranted: new FormControl(false),
        permissions: new FormArray([]),
        indeterminate: new FormControl(null),
      });
      (group.controls.subGroups as FormArray).push(parent);

      let allGranted = true;
      let isIndeterminate = false,
      allDisabled = true;
      sub.permissions.map(permission => {
        if(permission.isGranted) isIndeterminate = true;
        else allGranted = false;

        let form = new FormGroup({
          displayName: new FormControl(permission.displayName),
          isGranted: new FormControl(permission.isGranted || false),
          name: new FormControl(permission.name),
          parentName: new FormControl(permission.parentName),
        });
        (parent.controls.permissions as FormArray).push(form);
        if(this.providerName == 'U' && permission.grantedProviders.filter(x => x.providerName === 'R').length) form.controls.isGranted.disable();
        else allDisabled = false;
      });

      if(allDisabled) parent.disable();

      parent.controls.isGranted.setValue(allGranted);
      parent.controls.indeterminate.setValue(isIndeterminate && !allGranted);
    });

    group.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      setTimeout(() => {
        this.checkGroupValue(group);
      })
    });
    this.checkGroupValue(group)
  }

  checkGroupValue(group:FormGroup) {
    let allGranted = true,
        isIndeterminate = false,
        checkedCount = 0;

    for(let sub of group.controls.subGroups['controls']) {
      // if(!allGranted && isIndeterminate) break;
      if(!sub.controls.isGranted.value) allGranted = false;
      else {
        // checkedCount += 1;
        isIndeterminate = true;
      }
      for(let per of sub.controls.permissions['controls']) {
        // if(!allGranted && isIndeterminate) break;
        if(!per.controls.isGranted.value) allGranted = false;
        else {
          checkedCount += 1;
          isIndeterminate = true;
        }
      }
    }
   
    
    group.controls.indeterminate.setValue(isIndeterminate && !allGranted ,  { emitEvent: false })
    group.controls.isGranted.setValue(allGranted,  { emitEvent: false });
    group.controls.checkedCount.setValue(checkedCount,  { emitEvent: false });
  }


  subGroupChanged(subGroup, value) {
    for(let control of subGroup.controls.permissions.controls) if(!control.controls.isGranted.disabled) control.controls.isGranted.setValue(value);
  }

  permissionChanged(permission, index, checked) {
    let subGroup = permission.parent.parent,
    allGranted = true,
    isIndeterminate = false;

    if(index != 0) {
      if(checked) {
        permission.parent.controls[0].controls.isGranted.setValue(true);
      }

    } else {
      if(!checked) {
        for(let c of permission.parent.controls) c.controls.isGranted.setValue(false);
      }
    }

    for(let value of permission.parent.getRawValue()) {
      if(value.isGranted) isIndeterminate = true;
      else allGranted = false;
    }

    subGroup.controls.isGranted.setValue(allGranted);
    subGroup.controls.indeterminate.setValue(isIndeterminate && !allGranted)
  }

  selectAllSubGroups(checked, group) {
    for (let sub of group.controls.subGroups.controls) this.changeSubGroup(checked, sub);
    this.checkGroupValue(group);
  }

  changeSubGroup(checked, subGroup: FormGroup) {
    if(!subGroup.controls.isGranted.disabled) subGroup.controls.isGranted.setValue(checked, { emitEvent: false });
    let permission: FormGroup;
    for (permission of subGroup.controls.permissions['controls']) {
      if(!permission.controls.isGranted.disabled)  permission.controls.isGranted.setValue(checked, { emitEvent: false });
    }
  }

  isSaving
  save() {
    this.isSaving = true;
   
    let value = [];
    this.form.value.groups.map(g => {
      if(g.subGroups) g.subGroups.map(sub => {
        if(sub.permissions) sub.permissions.map(p => {
          value.push({
            name:p.name,
            isGranted:p.isGranted
          })
        })
      })
    })
  
    this.permissionsService
      .update(this.providerName, this.id, { permissions: value })
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(() => {
        this.toasterService.success('::SuccessfullySaved', "");
        this.ref.close();
      });
  }
}
