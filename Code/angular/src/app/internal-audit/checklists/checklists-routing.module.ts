import { FormMode } from './../../shared/interfaces/form-mode';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    path:'list',
    component:ListComponent,
    canActivate:[PermissionGuard],
    data:{
      requiredPolicy:'ComplianceSystem.InternalAuditQuestionList'
    }
  },
  {
    path:'create',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Create,
      requiredPolicy:'ComplianceSystem.InternalAuditQuestionList.Create'
    }
  },
  {
    path:':id/edit',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Edit,
      requiredPolicy:'ComplianceSystem.InternalAuditQuestionList.Edit'
    }
  },
  {
    path:':id/view',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{
      mode:FormMode.Edit,
      requiredPolicy:'ComplianceSystem.InternalAuditQuestionList'
    }
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
