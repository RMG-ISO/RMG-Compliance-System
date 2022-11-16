import { PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'list',
    loadChildren: () => import('../audit-shared/audit-shared.module').then(m => m.AuditSharedModule),
    canActivate:[PermissionGuard],
    data:{
      route:'audit-setup',
      requiredPolicy:'ComplianceSystem.InternalAuditPreparation'
    }
  },
  {
    path:'create',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Create,
      requiredPolicy:'ComplianceSystem.InternalAuditPreparation.Create'
    }
  },
  {
    path:':id/edit',
    component:CreateComponent,
    data:{
      mode:FormMode.Edit,
      requiredPolicy:'ComplianceSystem.InternalAuditPreparation.Update'
    }
  },
  {
    path:':id/view',
    component:CreateComponent,
    data:{
      mode:FormMode.View
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
export class AuditSetupRoutingModule { }
