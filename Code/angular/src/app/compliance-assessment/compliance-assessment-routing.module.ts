import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DomainViewComponent } from '../frameworks/domain-view/domain-view.component';
import { ControlViewComponent } from '../frameworks/control-view/control-view.component';
import { FrameworkViewComponent } from '../frameworks/framework-view/framework-view.component';

const routes: Routes = [
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'sub-domains/:subDomainId/controls',
    component:DomainViewComponent
  },
  {
    path:'sub-controls/:frameworkId/:subDomainId/:subControlId',
    component:ControlViewComponent
  },
  {
    path:':frameworkId',
    component:FrameworkViewComponent,
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
export class ComplianceAssessmentRoutingModule { }
