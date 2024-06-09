const apiUrl = `https://ncts.hicas.vn`;

interface EnvVars {
  dev: EnvVar;
  prod: EnvVar;
}

interface EnvVar {
  identityUrl: string;
  apiUrl: string;
  oAuthConfig: {
    issuer: string;
    clientId: string;
    scope: string;
    scopeOffline: string;
    clientSecret?: string;
  };
  localization: {
    defaultResourceName: string;
  };
}

const ENV: EnvVars = {
  dev: {
    identityUrl: 'https://ncts.hicas.vn',
    apiUrl: 'https://ncts.hicas.vn',
    oAuthConfig: {
      issuer: 'https://ncts.hicas.vn',
      clientId: 'Tracking_App',
      scope: 'Tracking',
      scopeOffline: 'offline_access Tracking',
      clientSecret: 'we2gth#',
    },
    localization: {
      defaultResourceName: 'hicas',
    },
  },
  prod: {
    identityUrl: 'https://ncts.hicas.vn',
    apiUrl: 'https://ncts.hicas.vn',
    oAuthConfig: {
      issuer: 'https://ncts.hicas.vn',
      clientId: 'Tracking_App',
      scope: 'Tracking',
      scopeOffline: 'offline_access Tracking',
      clientSecret: 'we2gth#',
    },
    localization: {
      defaultResourceName: 'hicas',
    },
  },
};

export const getEnvVars = () => {
  return process.env.NODE_ENV === 'development' ? ENV.dev : ENV.prod;
};
