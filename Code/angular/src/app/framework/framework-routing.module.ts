import { DomainComponent } from './domain/domain.component';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameworkComponent } from './framework.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: FrameworkComponent, 
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Framework',
    },
  },
  {
    path: ':frameworkId',
    component: DomainComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Framework',
    },
  },
  {
    path: ':frameworkId/main-domains',
    loadChildren: () => import('./domain/domain.module').then(m => m.DomainModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
