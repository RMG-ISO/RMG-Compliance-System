import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';

const routes: Routes = [
  {
    path:'list',
    component:FrameworksListComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworksRoutingModule { }
