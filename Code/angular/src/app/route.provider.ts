import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path:'/dashboard',
        name:'::Dashboard:Title',
        iconClass: 'fas fa-chart-line',
        order: 1,
        layout: eLayoutType.application,
      },
      // {
      //   path: '/home',
      //   name: '::Menu:Home',
      //   iconClass: 'fas fa-home',
      //   order: 1,
      //   layout: eLayoutType.application,
      // },
      {
        path:'/framework',
        name:'::Menu:Framework',
        iconClass: 'fas fa-th-large',
        order: 1,
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Framework',
      },
      // {
      //   path:'/document',
      //   name:'::Menu:DocumentManagement',
      //   iconClass: 'fa fa-cloud-upload',
      //   order: 1,
      //   layout: eLayoutType.application,
      // },
      {
        path:'/assessment',
        name:'::Menu:Assessment',
        iconClass: 'fas fa-sitemap',
        order: 1,
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Assessment',
      },
      ,
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

      // {
      //   path:'/design-guide',
      //   name:'::design-guide',
      //   iconClass: 'fas fa-building',
      //   order: 1,
      //   layout: eLayoutType.application,
      //   requiredPolicy:'ComplianceSystem.Department',
      // },

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
        path:'/department',
        name:'::Menu:Department',
        iconClass: 'fas fa-building',
        order: 1,
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Department',
      },
      {
        path:'/employee',
        name:'::Menu:Employee',
        iconClass: 'fas fa-users',
        order: 2,
        parentName:'::Menu:ComplianceSystemSettings',
        layout: eLayoutType.application,
        requiredPolicy:'ComplianceSystem.Employee',
      },
      // {
      //   path:'/documents-management',
      //   name:'::DocumentManagement',
      //   iconClass: 'fa fa-cloud-upload',
      //   order: 1,
      //   layout: eLayoutType.application,
      //   // requiredPolicy:'ComplianceSystem.Framework',
      // },


      // {
      //   path: '/compliance-department',
      //   name: '::Menu:ComplianceDepartment',
      //   iconClass: 'fas fa-home',
      //   order: 1,
      //   layout: eLayoutType.application,
      //   parentName:'::Menu:Home'
      // },

      // {
      //   path: "/book-store",
      //   name: "::Menu:BookStore",
      //   iconClass: "fas fa-book",
      //   order: 2,
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: "/books",
      //   name: "::Menu:Books",
      //   parentName: "::Menu:BookStore",
      //   requiredPolicy:"ComplianceSystem.Books",
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: "/authors",
      //   name: "::Menu:Authors",
      //   parentName: "::Menu:BookStore",
      //   requiredPolicy:"ComplianceSystem.Authors",
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: "/abp-books",
      //   name: "::Menu:abp-Books",
      //   parentName: "::Menu:BookStore",
      //   requiredPolicy:"ComplianceSystem.Books",
      //   layout: eLayoutType.application,
      // },

    ]);
  };
}
