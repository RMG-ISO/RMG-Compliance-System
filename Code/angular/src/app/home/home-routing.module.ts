import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '@abp/ng.core';
import { SubscriptionGuard } from '../shared/guards/subscription.guard';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard,SubscriptionGuard],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
