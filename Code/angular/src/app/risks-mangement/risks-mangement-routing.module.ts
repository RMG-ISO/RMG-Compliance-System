import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FifthComponent } from './create/fifth/fifth.component';
import { FirstComponent } from './create/first/first.component';
import { FourthComponent } from './create/fourth/fourth.component';
import { SecondComponent } from './create/second/second.component';
import { ThirdComponent } from './create/third/third.component';
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
    component:CreateComponent,
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
