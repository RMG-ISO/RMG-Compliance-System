import { PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { RiskTreatmentModalComponent } from './create/fourth/risk-treatment-modal/risk-treatment-modal.component';
import { ListComponent } from './list/list.component';
import { settingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'risks',
    pathMatch:'full'
  },
  {
    path:'riskopportunity',
    component:ListComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.RiskAndOpportunity',
    },
  },
  {
    path:'create',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.RiskAndOpportunity.Create',
    },
  },
  {
    path:'settings',
    component:settingsComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.StaticData',
    },
  },
  {
    path:'risk-treatment/:treatmentId',
    component:RiskTreatmentModalComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.RiskAndOpportunity.ReEvaluation',
    },
  },
  {
    path:':id/edit',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data: {
      requiredPolicy: 'ComplianceSystem.RiskAndOpportunity.Update',
    },
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RisksMangementRoutingModule { }
