import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiredSubscriptionComponent } from './expired-subscription/expired-subscription.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';



@NgModule({
  declarations: [
    ExpiredSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
