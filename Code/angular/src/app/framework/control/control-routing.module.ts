import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:ControlComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Control',
      mainControls:true
    },
  },{
    path:':mainControlId/sub-controls',
    component:ControlComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.Control',
      mainControls:false
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
