import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard, PermissionGuard],
  },
  // {
  //   path:'framework',
  //   canActivate: [AuthGuard, PermissionGuard],
  //   loadChildren: () => import('./framework/framework.module').then(m => m.FrameworkModule)
  // },
  {
    path:'frameworks',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./frameworks/frameworks.module').then(m => m.FrameworksModule),
    data:{
      requiredPolicy:'ComplianceSystem.Framework'
    }
  },
  {
    path:'compliance-assessment',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./compliance-assessment/compliance-assessment.module').then(m => m.ComplianceAssessmentModule),
    data:{
      requiredPolicy:'ComplianceSystem.Assessment'
    }
  },
  {
    path:'assessment',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule)
  },
  // {
  //   path:'dashboard',
  //   canActivate: [AuthGuard, PermissionGuard],
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  //   data:{
  //     requiredPolicy:'ComplianceSystem.Framework'
  //   }
  // },
  {
    path:'documents-management',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./documents-mangement/documents-mangement.module').then(m => m.DocumentsMangementModule)
  },
  {
    path:'risks-management',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./risks-mangement/risks-mangement.module').then(m => m.RisksMangementModule)
  },
  {
    path:'notifications',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
 
  // {
  //   path:'internal-audit',
  //   canActivate: [AuthGuard, PermissionGuard],
  //   loadChildren: () => import('./internal-audit/internal-audit.module').then(m => m.InternalAuditModule)
  // },





  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },

  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () => import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  {
    path:'settings',
    loadChildren:() => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path:'policy',
    loadChildren:() => import('./policy/policy.module').then(m => m.PolicyModule)
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
