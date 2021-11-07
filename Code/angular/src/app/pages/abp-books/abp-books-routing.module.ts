import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbpBooksComponent } from './abp-books.component';

const routes: Routes = [{ path: '', component: AbpBooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbpBooksRoutingModule { }
