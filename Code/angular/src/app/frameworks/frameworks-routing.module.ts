import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ControlsComponent } from './controls/controls.component';
// import { DomainsComponent } from './domains/domains.component';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';

const routes: Routes = [
  {
    path:'list',
    component:FrameworksListComponent
  },
  {
    path:':frameworkId',
    component:FrameworkViewComponent,
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
