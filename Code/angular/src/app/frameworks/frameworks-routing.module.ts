import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ControlsComponent } from './controls/controls.component';
// import { DomainsComponent } from './domains/domains.component';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import { DomainViewComponent } from './domain-view/domain-view.component';
import { ControlViewComponent } from './control-view/control-view.component';
import { FrameDetailsViewComponent } from './framework-view/frame-details-view/frame-details-view.component';
import { MainDomainsViewComponent } from './framework-view/main-domains-view/main-domains-view.component';
import { ChangeLogComponent } from './framework-view/change-log/change-log.component';
import { FrameFilesComponent } from './framework-view/frame-files/frame-files.component';
import { FrameReportComponent } from './framework-view/frame-report/frame-report.component';
import { PermissionGuard } from '@abp/ng.core';
import { SubscriptionGuard } from '../shared/guards/subscription.guard';

const routes: Routes = [
  {
    path:'list',
    component:FrameworksListComponent,
    canActivate : [SubscriptionGuard]
  },
  {
    path:'sub-domains/:subDomainId/controls',
    component:DomainViewComponent,
    // canActivate:[
    //   PermissionGuard
    // ],
    // data:{
    //   requiredPolicy:'ComplianceSystem.Domain'
    // }
  },//ComplianceSystem.Control
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
      // {
      //   path:'reports',
      //   component:FrameReportComponent
      // },
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
    // children:[
    //   {
    //     path:'',
    //     component:DomainsComponent,
    //     data:{isMainDomains:true}
    //   },
    //   {
    //     path:'main-domains/:mainDomainId/sub-domains',
    //     component:DomainsComponent,
    //     data:{isMainDomains:false}
    //   },
    //   {
    //     path:'main-domains/:mainDomainId/sub-domains/:subDomainId/main-controls',
    //     component:ControlsComponent,
    //     data:{isMainControls:true}
    //   },
    //   {
    //     path:'main-domains/:mainDomainId/sub-domains/:subDomainId/:mainControlId/sub-controls',
    //     component:ControlsComponent,
    //     data:{isMainControls:false}
    //   },
    // ]
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
