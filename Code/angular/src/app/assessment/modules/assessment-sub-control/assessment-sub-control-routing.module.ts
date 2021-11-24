import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentSubControlComponent } from './assessment-sub-control.component';

const routes: Routes = [
  {
    path:'',
    component:AssessmentSubControlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentSubControlRoutingModule { }
