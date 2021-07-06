const OKTA_BASE = process.env.REACT_APP_OKTA_BASE || null;
const ISSUER = process.env.REACT_APP_ISSUER || null;
const REDIRECT_URI = `${window.location.origin}/poc/oidc/callback`;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || null;

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: false,
    useInteractionCode: false,
    postLogoutRedirectUri: `${window.location.origin}/poc/oidc`,
    tokenManager: {
      storage: "sessionStorage",
    },
    devMode: true,
  },
  oktaInstance: {
    baseUrl: OKTA_BASE,
  },
};

export default config;
