import { ComplianceManagementComponent } from './compliance-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    component:ComplianceManagementComponent
  },
  {
    path:':frameworkId',
    loadChildren: () => import('./domain/domain.module').then(m => m.DomainModule)
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
