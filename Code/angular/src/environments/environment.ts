import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'ComplianceSystem',
    logoUrl: '',
  },
  // oAuthConfig: {
  //   issuer: 'https://localhost:44375',
  //   redirectUri: baseUrl,
  //   clientId: 'ComplianceSystem_App',
  //   responseType: 'code',
  //   scope: 'offline_access openid profile role email phone ComplianceSystem',
  //   requireHttps: true,
  // },

  oAuthConfig: {
    issuer: 'https://localhost:44375',
    clientId: 'ComplianceSystem_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'offline_access openid profile role email phone ComplianceSystem',
  },


  apis: {
    default: {
      url: 'https://localhost:44375',
      rootNamespace: 'RMG.ComplianceSystem',
    },
  },
} as Environment;
