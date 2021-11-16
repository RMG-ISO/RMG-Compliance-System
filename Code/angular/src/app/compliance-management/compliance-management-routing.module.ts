import { ComplianceManagementComponent } from './compliance-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    component:ComplianceManagementComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceManagementRoutingModule { }
