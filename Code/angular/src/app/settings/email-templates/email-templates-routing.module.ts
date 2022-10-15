import { PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'list',
    component:ListComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.EmailTemplate',
    },
  },
  {
    path:'create',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Create,
      requiredPolicy: 'ComplianceSystem.EmailTemplate.Create',
    },
  },
  {
    path:':id/edit',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Edit,
      requiredPolicy: 'ComplianceSystem.EmailTemplate.Update',
    }
  },
  {
    path:'',
    redirectTo:'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplatesRoutingModule { }
