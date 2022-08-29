import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path:'framework',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./framework/framework.module').then(m => m.FrameworkModule)
  },
  {
    path:'assessment',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule)
  },
  {
    path:'department',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
  },
  {
    path:'employee',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path:'dashboard',
    canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // {
  //   path:'files-management',
  //   canActivate: [AuthGuard, PermissionGuard],
  //   loadChildren: () => import('./files-management/files-management.module').then(m => m.FilesManagementModule)
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

  // {
  //   path: 'compliance-department',
  //   loadChildren: () => import('./compliance-department/compliance-department.module').then(m => m.ComplianceDepartmentModule),
  // },
  // {
  //   path: 'abp-books',
  //   loadChildren: () => import('./abp-books/abp-books.module').then(m => m.AbpBooksModule),
  // },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
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

  // { path: 'books', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  // { path: 'authors', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  // { path: 'author-with-books', loadChildren: () => import('./author-with-books/author-with-books.module').then(m => m.AuthorWithBooksModule) },
  // { path: 'abp-books', loadChildren: () => import('./abp-books/abp-books.module').then(m => m.AbpBooksModule) },
  {
    path:'design-guide',
    loadChildren:() => import('./design-guide/design-guide.module').then(m => m.DesignGuideModule)
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
