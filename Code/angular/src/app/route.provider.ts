import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.remove(['AbpUiNavigation::Menu:Administration'])
    routesService.add([
      {
        path:'/dashboard',
        name:'::Dashboard:Title',
        iconClass: 'fas fa-chart-line',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/home',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path:'/framework',
        name:'::Menu:Framework',
        iconClass: 'fas fa-th-large',
        order: 1,
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Framework',
      },
      {
        path:'/assessment',
        name:'::Menu:Assessment',
        iconClass: 'fas fa-sitemap',
        order: 1,
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Assessment',
      },
      {
        path:'/notifications',
        name:'::Menu:Notifications',
        iconClass: 'fas fa-bell',
        order: 1,
        invisible:true,
        layout: eLayoutType.application,
      },
      {
        path:'/risks-management',
        name:'::Menu:RiskManagement',
        iconClass: 'fas fa-asterisk',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path:'/risks-management/settings',
        name:'::Menu:StaticData',
        iconClass: 'fas fa-cogs',
        order: 1,
        parentName:'::Menu:RiskManagement',
        layout: eLayoutType.application,
      },

      {
        path:'/risks-management/riskopportunity',
        name:'::Menu:RiskOpportunity',
        iconClass: 'fas fa-asterisk',
        order: 1,
        parentName:'::Menu:RiskManagement',
        layout: eLayoutType.application,
      },



       //Internal Audit
       {
        path:'/internal-audit',
        name:'::AuditManagement',
        iconClass: 'fa-solid fa-arrow-up-right-dots',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path:'/internal-audit/questions',
        name:'::AuditQuestions',
        iconClass: 'fa-solid fa-question',
        order: 2,
        parentName:'::AuditManagement',
        layout: eLayoutType.application,
      },
      {
        path:'/internal-audit/checklists',
        name:'::CheckLists',
        iconClass: 'fa-solid fa-list-check',
        order: 2,
        parentName:'::AuditManagement',
        layout: eLayoutType.application,
      },
      {
        path:'/internal-audit/audit-setup',
        name:'::AuditSetup',
        iconClass: 'fa-solid fa-file-lines',
        order: 2,
        parentName:'::AuditManagement',
        layout: eLayoutType.application,
      },
      {
        path:'/internal-audit/approved-audits',
        name:'::AuditsStatus',
        iconClass: 'fa-solid fa-check',
        order: 2,
        parentName:'::AuditManagement',
        layout: eLayoutType.application,
      },


      {
        path:'/documents-management',
        name:'::Menu:DocumentsManagement',
        iconClass: 'fa fa-cloud-upload',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path:'/documents-management/documents',
        name:'::Menu:Documents',
        iconClass: 'fas fa-file',
        order: 1,
        parentName:'::Menu:DocumentsManagement',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Document',
      },
      {
        path:'/documents-management/categories',
        name:'::Menu:DocumentsCategories',
        iconClass: 'fas fa-list',
        order: 2,
        parentName:'::Menu:DocumentsManagement',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.DocumentCategory',
      },
      {
        path:'/department',
        name:'::Menu:ComplianceSystemSettings',
        iconClass: 'fas fa-cogs',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path:'/settings/department',
        name:'::Menu:Department',
        iconClass: 'fas fa-building',
        order: 1,
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Department',
      },
      {
        path:'/settings/employee',
        name:'::Menu:Employee',
        iconClass: 'fas fa-users',
        order: 2,
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Employee',
      },
      {
        path:'/settings/email-templates',
        name:'::EmailTemplate:Page:Title',
        iconClass: 'fas fa-envelope',
        order: 2,
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.EmailTemplate'
      },

      {
        path:'/settings/identity',
        name:'::Permissions',
        iconClass: 'fa fa-wrench',
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        order: 1,
      },
      {
        path:'/settings/identity/users',
        name:'AbpIdentity::Users',
        iconClass: 'fas fa-users',
        order: 2,
        parentName:'::Permissions',
        layout: eLayoutType.application,
        // requiredPolicy:'ComplianceSystem.Employee',
      },
      {
        path:'/settings/identity/roles',
        name:'AbpIdentity::Roles',
        iconClass: 'fas fa-user-tag',
        order: 2,
        parentName:'::Permissions',
        layout: eLayoutType.application,
        // requiredPolicy:'ComplianceSystem.Employee',
      },


     
    ]);
  };
}
