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
    path:'audit-setup',
    loadChildren: () => import('./audit-setup/audit-setup.module').then(m => m.AuditSetupModule)
  },
  {
    path:'approved-audits',
    loadChildren:() => import('./approved-audits/approved-audits.module').then(m => m.ApprovedAuditsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalAuditRoutingModule { }
