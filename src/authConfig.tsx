import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
	clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
	authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
	redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin + "/auth/callback",
	postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || window.location.origin + "/login",
	knownAuthorities: [`${import.meta.env.VITE_AZURE_TENANT_ID}.b2clogin.com`, `login.microsoftonline.com`],
  },
  cache: {
	cacheLocation: "localStorage",
	storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: import.meta.env.VITE_AZURE_LOGIN_SCOPES?.split(',') || ["User.Read"],
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
    `${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`
  ],
  authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
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
    import.meta.env.VITE_AZURE_CLIENT_ID
  ],
  authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};

export const apiTokenRequest = {
  scopes: [
    `${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`
  ],
  extraQueryParameters: {
    claims: JSON.stringify({
      "access_token": {
        "groups": null
      }
    })
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);