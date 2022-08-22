import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { settingsComponent } from './settings/settings.component';
import { riskopportunityComponent } from './riskAndOpportunity/riskopportunity.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'risks',
    pathMatch:'full'
  },
  {
    path:'riskopportunity',
    component:riskopportunityComponent
  },
  {
    path:'settings',
    component:settingsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RisksMangementRoutingModule { }
