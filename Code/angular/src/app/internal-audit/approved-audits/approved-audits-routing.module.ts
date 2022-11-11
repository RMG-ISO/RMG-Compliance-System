import { AuditItemComponent } from './audit-item/audit-item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

const routes: Routes = [
  {
    path:'list',
    // component:ListComponent
    loadChildren: () => import('../audit-shared/audit-shared.module').then(m => m.AuditSharedModule),
    data:{
      route:'approved-audits'
    }
  },
  {
    path:':id/approve-decline',
    component:AuditItemComponent,
    data:{
      mode:'ApproveDecline'
    }
  },
  {
    path:':id/view',
    component:AuditItemComponent,
    data:{
      mode:FormMode.View
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
export class ApprovedAuditsRoutingModule { }
