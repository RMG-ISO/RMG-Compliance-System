import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'employee',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path:'department',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
  },
  {
    path:'email-templates',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren:() => import('./email-templates/email-templates.module').then(m => m.EmailTemplatesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
