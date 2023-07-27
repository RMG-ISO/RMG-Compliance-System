import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpiredSubscriptionComponent } from "./expired-subscription/expired-subscription.component";


const routes: Routes = [
    {
      path:'',
      component:ExpiredSubscriptionComponent
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SubscriptionRoutingModule { }