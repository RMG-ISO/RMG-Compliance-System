import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:DocumentsComponent
  },
  {
    path:'create',
    component:DocumentCreateComponent,
    data:{
      mode:FormMode.Create,
    }
  },
  {
    path:':documentId',
    component:DocumentViewComponent,
    children:[
      {
        path:'details',
        component:DocumentDetailsComponent
      },
      {
        path:'edit',
        component:DocumentCreateComponent,
        data:{
          mode:FormMode.Edit,
        }
      },
      {
        path:'settings',
        component:DocumentDetailsComponent
      },
      {
        path:'activities',
        component:DocumentDetailsComponent
      },
     
     
     
     
    ]
   
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }