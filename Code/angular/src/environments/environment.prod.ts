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
  //   issuer: 'https://iso.digitaltransformationinstitute.org:11000',
  //   redirectUri: baseUrl,
  //   clientId: 'ComplianceSystem_App',
  //   responseType: 'code',
  //   scope: 'offline_access ComplianceSystem',
  //   requireHttps: true
  // },
  oAuthConfig: {
    issuer: 'https://iso.digitaltransformationinstitute.org:11000',
    clientId: 'ComplianceSystem_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'offline_access openid profile role email phone ComplianceSystem',
  },
  apis: {
    default: {
      url: 'https://iso.digitaltransformationinstitute.org:11000',
      rootNamespace: 'RMG.ComplianceSystem',
    },
  },
} as Environment;
