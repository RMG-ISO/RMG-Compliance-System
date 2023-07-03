import { Environment } from '@abp/ng.core';

const baseUrl = 'https://iso.digitaltransformationinstitute.org:11001';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'ComplianceSystem',
    logoUrl: 'assets/logo.png',
  },
  
  // oAuthConfig: {
  //   issuer: 'https://iso.digitaltransformationinstitute.org:11100',
  //   redirectUri: baseUrl,
  //   clientId: 'ComplianceSystem_App',
  //   responseType: 'code',
  //   scope: 'offline_access ComplianceSystem',
  //   requireHttps: true
  // },
  oAuthConfig: {
    issuer: 'https://iso.digitaltransformationinstitute.org:11100',
    clientId: 'ComplianceSystem_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'offline_access ComplianceSystem',
  },
  apis: {
    default: {
      url: 'https://iso.digitaltransformationinstitute.org:11100',
      rootNamespace: 'RMG.ComplianceSystem',
    },
  },
} as Environment;
