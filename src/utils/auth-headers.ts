import { msalInstance } from "@/authConfig";
import { AuthenticationResult } from "@azure/msal-browser";

export async function getAccessToken(): Promise<string | null> {
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      return null;
    }

    const scopeStrategies = [
      [`${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`],
      ["User.Read"],
      ["openid", "profile", "email"]
    ];

    for (const scopes of scopeStrategies) {
      try {
        
        const tokenRequest = {
          scopes,
          account: account,
        };

        const response: AuthenticationResult = await msalInstance.acquireTokenSilent(tokenRequest);
        
        if (response.accessToken) {
          return response.accessToken;
        }
      } catch (error) {
        continue;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Cria headers com autenticação para requisições HTTP
 */
export async function createAuthHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
