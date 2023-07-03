import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'ComplianceSystem',
    logoUrl: 'assets/logo.png',
  },
  
  oAuthConfig: {
    issuer: 'https://iso.digitaltransformationinstitute.org:11100',
    // issuer: 'https://localhost:44375',
    redirectUri: baseUrl,
    clientId: 'ComplianceSystem_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone ComplianceSystem',
    requireHttps: true,
  },
  // oAuthConfig: {
  //   issuer: 'https://iso.digitaltransformationinstitute.org:11100',
  //   issuer: 'https://localhost:44375',
  //   clientId: 'ComplianceSystem_App',
  //   dummyClientSecret: '1q2w3e*',
  //   scope: 'offline_access openid profile role email phone ComplianceSystem',
  // },

  apis: {
    default: {
      url: 'https://iso.digitaltransformationinstitute.org:11100',
      // url: 'https://localhost:44375',
      rootNamespace: 'RMG.ComplianceSystem',
    },
  },


  // oAuthConfig: {
  //   issuer: 'https://iso.digitaltransformationinstitute.org:11100',
  //   clientId: 'ComplianceSystem_App',
  //   dummyClientSecret: '1q2w3e*',
  //   scope: 'offline_access openid profile role email phone ComplianceSystem',
  // },


  // apis: {
  //   default: {
  //     url: 'https://iso.digitaltransformationinstitute.org:11100',
  //     rootNamespace: 'RMG.ComplianceSystem',
  //   },
  //   local: {
  //     url: 'https://iso.digitaltransformationinstitute.org:11100',
  //     rootNamespace: 'RMG.ComplianceSystem',
  //   },
  // },

} as Environment;
