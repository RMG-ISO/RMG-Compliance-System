import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'questions',
    loadChildren:() => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path:'checklists',
    loadChildren:() => import('./checklists/checklists.module').then(m => m.ChecklistsModule)
  },
  {
    path:'audits',
    loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalAuditRoutingModule { }
