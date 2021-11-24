import { AssessmentControlComponent } from './assessment-control.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    path: '',
    component: AssessmentControlComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Assessment',
    }
  },
  {
    path: ':controlId',
    loadChildren: () => import('../assessment-sub-control/assessment-sub-control.module').then(m => m.AssessmentSubControlModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'list',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentControlRoutingModule { }
