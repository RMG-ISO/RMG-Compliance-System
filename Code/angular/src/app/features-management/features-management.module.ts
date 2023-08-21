import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesManagementRoutingModule } from './features-management-routing.module';
import { FeatureManagementModule , FeatureManagementComponent} from '@abp/ng.feature-management';
import { FeatureComponent } from './feature/feature.component'



@NgModule({
  declarations: [
  
    FeatureComponent
  ],
  imports: [
    CommonModule ,
    FeaturesManagementRoutingModule,
    FeatureManagementModule
  ]
})
export class FeaturesManagementModule { }
