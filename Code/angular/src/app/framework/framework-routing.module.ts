import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameworkComponent } from './framework.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:FrameworkComponent
  },
  {
    path:':frameworkId',
    component:FrameworkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
