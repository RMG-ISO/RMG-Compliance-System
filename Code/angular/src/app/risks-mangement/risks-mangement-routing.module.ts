import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
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
    component:ListComponent
  },
  {
    path:'create',
    component:CreateComponent
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
