import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpiredSubscriptionComponent } from "./expired-subscription/expired-subscription.component";
import { ReplaceableRouteContainerComponent } from "@abp/ng.core";
import { eThemeBasicComponents } from "@abp/ng.theme.basic";


const routes: Routes = [
  {
    path:'',
    component:ExpiredSubscriptionComponent,
    // component: ReplaceableRouteContainerComponent,
    // data:{
    //   tenantBoxVisible: false,
    //   replaceableComponent: {
    //     key: 'Subscription' /* ResetPassword */,
    //     defaultComponent: ExpiredSubscriptionComponent,
    //   },
    // }
  },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SubscriptionRoutingModule { }