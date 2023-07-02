import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DomainViewComponent } from '../frameworks/domain-view/domain-view.component';
import { ControlViewComponent } from '../frameworks/control-view/control-view.component';
import { FrameworkViewComponent } from '../frameworks/framework-view/framework-view.component';
import { FrameDetailsViewComponent } from '../frameworks/framework-view/frame-details-view/frame-details-view.component';
import { MainDomainsViewComponent } from '../frameworks/framework-view/main-domains-view/main-domains-view.component';
import { ChangeLogComponent } from '../frameworks/framework-view/change-log/change-log.component';
import { FrameFilesComponent } from '../frameworks/framework-view/frame-files/frame-files.component';

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
    children:[
      {
        path:'details',
        component:FrameDetailsViewComponent
      },
      {
        path:'domains',
        component:MainDomainsViewComponent
      },
      {
        path:'attachments',
        component:FrameFilesComponent
      },
      {
        path:'changelog',
        component:ChangeLogComponent
      },
      {
        path:'',
        redirectTo:'details',
        pathMatch:'full'
      }
    ]
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
