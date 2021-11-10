import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainComponent } from './domain.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    data:{mainDomains:true},
    component:DomainComponent
  },{
    path:':mainDomainId/sub-domains',
    data:{mainDomains:false},
    component:DomainComponent
  },
  {
    path: ':mainDomainId/sub-domains/:subDomainId/main-controls',
    loadChildren: () => import('../control/control.module').then(m => m.ControlModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
