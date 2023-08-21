import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuard, PermissionGuard],
    data:{
      requiredPolicy:'AbpIdentity.Roles'
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard, PermissionGuard],
    data:{
      requiredPolicy:'AbpIdentity.Users'
    }
  },
  {
    path:'',
    redirectTo:'roles',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }

