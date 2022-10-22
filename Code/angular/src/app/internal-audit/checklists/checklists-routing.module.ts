import { FormMode } from './../../shared/interfaces/form-mode';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'create',
    component:CreateComponent,
    data:{
      mode:FormMode.Create
    }
  },
  {
    path:':id',
    component:CreateComponent,
    data:{
      mode:FormMode.Edit
    }
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
