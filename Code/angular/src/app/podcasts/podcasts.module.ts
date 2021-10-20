import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastsRoutingModule } from './podcasts-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PodcastsRoutingModule
  ]
})
export class PodcastsModule { }
