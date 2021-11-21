import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignGuideComponent } from './design-guide.component';

const routes: Routes = [
  {
    path:'',
    component:DesignGuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignGuideRoutingModule { }
