import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path:'documents',
    //canActivate: [AuthGuard, PermissionGuard],
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
  },
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
