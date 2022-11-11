import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'list',
    loadChildren: () => import('../audit-shared/audit-shared.module').then(m => m.AuditSharedModule),
    data:{
      route:'audit-setup'
    }
  },
  {
    path:'create',
    component:CreateComponent,
    data:{
      mode:FormMode.Create
    }
  },
  {
    path:':id/edit',
    component:CreateComponent,
    data:{
      mode:FormMode.Edit
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
