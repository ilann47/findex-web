import { msalInstance } from "@/authConfig";
import { AuthenticationResult } from "@azure/msal-browser";

export interface TokenRequest {
  scopes: string[];
  extraQueryParameters?: Record<string, string>;
}

export const TOKEN_STRATEGIES: TokenRequest[] = [
  {
    scopes: [`api://${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`],
  },
  
  {
    scopes: ["User.Read", "offline_access"],
    extraQueryParameters: {
      claims: JSON.stringify({
        "access_token": {
          "groups": null
        }
      })
    }
  },
  
  {
    scopes: ["User.Read"],
  },

  {
    scopes: ["openid", "profile", "email"],
  }
];

export async function tryGetTokenWithStrategies(): Promise<AuthenticationResult | null> {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    return null;
  }

  for (let i = 0; i < TOKEN_STRATEGIES.length; i++) {
    const strategy = TOKEN_STRATEGIES[i];
    
    try {
      const result = await msalInstance.acquireTokenSilent({
        ...strategy,
        account: account,
      });
      
      if (result.accessToken) {
        return result;
      }
    } catch (error) {
      continue;
    }
  }
  
  return null;
}
