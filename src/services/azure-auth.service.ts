import { msalInstance, loginRequest, apiRequest } from '../authConfig';
import { AzureUser, AzureTokenInfo } from '../types/auth';
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';

export class AzureAuthService {
  static async login(): Promise<AzureUser> {
    if (!msalInstance) {
      throw new Error('Azure AD não está configurado');
    }

    try {
      const result: AuthenticationResult = await msalInstance.loginPopup(loginRequest);
      return this.mapToUser(result);
    } catch (error) {
      console.error('Erro no login Azure:', error);
      throw new Error('Falha no login com Azure AD');
    }
  }

  static async logout(): Promise<void> {
    if (!msalInstance) {
      throw new Error('Azure AD não está configurado');
    }

    try {
      await msalInstance.logoutPopup();
    } catch (error) {
      console.error('Erro no logout Azure:', error);
      throw new Error('Falha no logout do Azure AD');
    }
  }

  static async getAccessToken(): Promise<string | null> {
    if (!msalInstance) {
      return null;
    }

    try {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        return null;
      }

      const response = await msalInstance.acquireTokenSilent({
        ...apiRequest,
        account
      });

      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await msalInstance.acquireTokenPopup(apiRequest);
          return response.accessToken;
        } catch (popupError) {
          console.error('Erro ao adquirir token via popup:', popupError);
          return null;
        }
      }
      console.error('Erro ao obter access token:', error);
      return null;
    }
  }

  static async getTokenInfo(): Promise<AzureTokenInfo | null> {
    if (!msalInstance) {
      return null;
    }

    try {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        return null;
      }

      const response = await msalInstance.acquireTokenSilent({
        ...apiRequest,
        account
      });

      return {
        accessToken: response.accessToken,
        idToken: response.idToken || '',
        expiresAt: response.expiresOn?.getTime() || 0,
        provider: 'azure',
        scopes: response.scopes || []
      };
    } catch (error) {
      console.error('Erro ao obter informações do token:', error);
      return null;
    }
  }

  static getCurrentUser(): AzureUser | null {
    if (!msalInstance) {
      return null;
    }

    const account = msalInstance.getActiveAccount();
    if (!account) {
      return null;
    }

    return {
      id: account.homeAccountId,
      email: account.username,
      name: account.name || account.username,
      provider: 'azure',
      tenantId: account.tenantId || '',
      groups: (account.idTokenClaims?.groups as string[]) || [],
      roles: (account.idTokenClaims?.roles as string[]) || []
    };
  }

  private static mapToUser(result: AuthenticationResult): AzureUser {
    const account = result.account;
    return {
      id: account.homeAccountId,
      email: account.username,
      name: account.name || account.username,
      provider: 'azure',
      tenantId: account.tenantId || '',
      groups: (account.idTokenClaims?.groups as string[]) || [],
      roles: (account.idTokenClaims?.roles as string[]) || []
    };
  }

  static async initialize(): Promise<void> {
    if (!msalInstance) {
      return;
    }

    try {
      await msalInstance.initialize();
      
      // Verificar se há um usuário logado
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Erro ao inicializar MSAL:', error);
    }
  }
}
