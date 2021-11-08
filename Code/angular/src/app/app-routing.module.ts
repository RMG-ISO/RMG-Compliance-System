import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'compliance-department',
    loadChildren: () => import('./compliance-department/compliance-department.module').then(m => m.ComplianceDepartmentModule),
  },  
  {
    path: 'abp-books',
    loadChildren: () => import('./abp-books/abp-books.module').then(m => m.AbpBooksModule),
  },  
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
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },

  { path: 'books', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'authors', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  { path: 'author-with-books', loadChildren: () => import('./author-with-books/author-with-books.module').then(m => m.AuthorWithBooksModule) },
  { path: 'abp-books', loadChildren: () => import('./abp-books/abp-books.module').then(m => m.AbpBooksModule) },

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
