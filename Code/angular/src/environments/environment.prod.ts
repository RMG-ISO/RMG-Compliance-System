import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'ComplianceSystem',
    logoUrl: 'assets/logo.png',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44375',
    redirectUri: baseUrl,
    clientId: 'ComplianceSystem_App',
    responseType: 'code',
    scope: 'offline_access ComplianceSystem',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44375',
      rootNamespace: 'RMG.ComplianceSystem',
    },
  },
} as Environment;
