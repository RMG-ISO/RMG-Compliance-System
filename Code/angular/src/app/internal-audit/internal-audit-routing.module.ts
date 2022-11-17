import { PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'questions',
    loadChildren:() => import('./questions/questions.module').then(m => m.QuestionsModule),
    canActivate:[ PermissionGuard ],
    data:{
      requiredPolicy:'ComplianceSystem.InternalAuditQuestion'
    }
  },
  {
    path:'checklists',
    loadChildren:() => import('./checklists/checklists.module').then(m => m.ChecklistsModule),
    canActivate:[ PermissionGuard ],
    data:{
      requiredPolicy:'ComplianceSystem.InternalAuditQuestionList'
    }
  },
  {
    path:'audit-setup',
    loadChildren: () => import('./audit-setup/audit-setup.module').then(m => m.AuditSetupModule),
    canActivate:[ PermissionGuard ],
    data:{
      requiredPolicy:'ComplianceSystem.InternalAuditPreparation'
    }
  },
  {
    path:'approved-audits',
    loadChildren:() => import('./approved-audits/approved-audits.module').then(m => m.ApprovedAuditsModule),
    canActivate:[ PermissionGuard ],
    data:{
      requiredPolicy:'ComplianceSystem.InternalAuditPreparation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalAuditRoutingModule { }
