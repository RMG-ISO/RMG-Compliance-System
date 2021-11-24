import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentSubControlComponent } from './assessment-sub-control.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentSubControlComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Assessment',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentSubControlRoutingModule { }
