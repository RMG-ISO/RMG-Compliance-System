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
    path:'identity',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./identity/identity.module').then(m => m.IdentityModule)
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
  },
  // {
  //   path:'test-users',
  //   loadChildren:() => import('./users/users.module').then(m => m.UsersModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
