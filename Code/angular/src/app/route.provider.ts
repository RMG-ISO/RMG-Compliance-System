import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/home',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/home',
        name: '::Menu:HomePage',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
        parentName:'::Menu:Home'
      },
      {
        path: '/abp-books',
        name: '::Menu:AbpBooks',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
        parentName:'::Menu:Home'
      },
      {
        path: "/book-store",
        name: "::Menu:BookStore",
        iconClass: "fas fa-book",
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: "/books",
        name: "::Menu:Books",
        parentName: "::Menu:BookStore",
        layout: eLayoutType.application,
      },
      {
        path: "/authors",
        name: "::Menu:Authors",
        parentName: "::Menu:BookStore",
        layout: eLayoutType.application,
      },

    ]);
  };
}
