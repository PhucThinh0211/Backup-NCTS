const apiUrl = `https://sit.ntcs.hicas.vn`;

interface EnvVars {
  dev: EnvVar;
  prod: EnvVar;
}

interface EnvVar {
  identityUrl: string;
  apiUrl: string;
  checkInUrl: string;
  oAuthConfig: {
    issuer: string;
    clientId: string;
    scope: string;
    clientSecret?: string;
  };
  localization: {
    defaultResourceName: string;
  };
}

const ENV: EnvVars = {
  dev: {
    identityUrl: 'https://sit.ntcs.hicas.vn',
    apiUrl,
    checkInUrl: 'https://checkin.tingconnect.com',
    oAuthConfig: {
      issuer: apiUrl,
      clientId: 'CXM',
      scope: 'offline_access API',
      clientSecret: 'ConstruxivViewersecret',
    },
    localization: {
      defaultResourceName: 'hicas',
    },
  },
  prod: {
    identityUrl: 'https://sit.ntcs.hicas.vn',
    apiUrl,
    checkInUrl: 'https://checkin.tingconnect.com',
    oAuthConfig: {
      issuer: apiUrl,
      clientId: 'CXM',
      scope: 'offline_access API',
      clientSecret: 'ConstruxivViewersecret',
    },
    localization: {
      defaultResourceName: 'hicas',
    },
  },
};

export const getEnvVars = () => {
   
  return process.env.NODE_ENV === 'development' ? ENV.dev : ENV.prod;
};
