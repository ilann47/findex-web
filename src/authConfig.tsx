import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { ENV_CONFIG } from "./config/environment";

// Configuração Azure AD (mantém a existente)
export const msalConfig: Configuration = {
  auth: {
    clientId: ENV_CONFIG.azureClientId,
    authority: `https://login.microsoftonline.com/${ENV_CONFIG.azureTenantId}`,
    redirectUri: ENV_CONFIG.redirectUri || window.location.origin + "/auth/callback",
    postLogoutRedirectUri: ENV_CONFIG.postLogoutRedirectUri || window.location.origin + "/login",
    knownAuthorities: [`${ENV_CONFIG.azureTenantId}.b2clogin.com`, `login.microsoftonline.com`],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ENV_CONFIG.azureLoginScopes,
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};

export const apiRequest = {
  scopes: [
    `${ENV_CONFIG.azureClientId}/.default`
  ],
  authority: `https://login.microsoftonline.com/${ENV_CONFIG.azureTenantId}`,
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};

export const apiRequestDirect = {
  scopes: [
    ENV_CONFIG.azureClientId
  ],
  authority: `https://login.microsoftonline.com/${ENV_CONFIG.azureTenantId}`,
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};

// Instância MSAL (só criada se Azure estiver habilitado)
export const msalInstance = ENV_CONFIG.enabledProviders.includes('azure') 
  ? new PublicClientApplication(msalConfig)
  : null;

// Configuração Google OAuth
export const googleConfig = {
  clientId: ENV_CONFIG.googleClientId,
  scope: 'openid email profile',
  redirectUri: ENV_CONFIG.redirectUri || window.location.origin + "/auth/callback",
  postLogoutRedirectUri: ENV_CONFIG.postLogoutRedirectUri || window.location.origin + "/login",
};

// Configuração unificada
export const authConfig = {
  enabledProviders: ENV_CONFIG.enabledProviders,
  defaultProvider: ENV_CONFIG.defaultProvider,
  azure: ENV_CONFIG.enabledProviders.includes('azure') ? {
    msalConfig,
    loginRequest,
    apiRequest,
    apiRequestDirect,
    instance: msalInstance
  } : null,
  google: ENV_CONFIG.enabledProviders.includes('google') ? googleConfig : null,
};

export const apiTokenRequest = {
  scopes: [
    `${ENV_CONFIG.azureClientId}/.default`
  ],
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};