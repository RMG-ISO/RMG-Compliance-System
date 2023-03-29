import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';

const routes: Routes = [
  {
    path:'list',
    component:FrameworksListComponent
  },
  {
    path:':frameworkId',
    component:FrameworkViewComponent
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
