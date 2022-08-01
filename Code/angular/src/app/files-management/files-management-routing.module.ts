import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesManagementComponent } from './files-management.component';

const routes: Routes = [
  {
    path:'',
    component:FilesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesManagementRoutingModule { }
