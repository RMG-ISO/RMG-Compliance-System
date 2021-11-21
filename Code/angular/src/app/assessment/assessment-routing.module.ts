import { AssessmentComponent } from './assessment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    component:AssessmentComponent
  },
  {
    path:':frameworkId',
    loadChildren: () => import('./assessment-control/assessment-control.module').then(m => m.AssessmentControlModule)
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
