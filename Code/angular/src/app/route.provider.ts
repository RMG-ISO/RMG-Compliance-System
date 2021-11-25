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
        name:'::Menu:Dashboard',
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
      // {
      //   path:'/design-guide',
      //   name:'::design-guide',
      //   iconClass: 'fas fa-building',
      //   order: 1,
      //   layout: eLayoutType.application,
      //   requiredPolicy:'ComplianceSystem.Department',
      // },

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
