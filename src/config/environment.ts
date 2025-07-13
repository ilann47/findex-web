
interface EnvironmentConfig {
  azureClientId: string;
  azureTenantId: string;
  apiBaseUrl: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  loginScopes: string[];
  groups: {
    geral: string;
    authAdmin: string;
    director: string;
    finance: string;
    manager: string;
  };
}

const REQUIRED_VARS = [
  'VITE_AZURE_CLIENT_ID',
  'VITE_AZURE_TENANT_ID'
] as const;

function validateRequiredVariables(): void {
  const missing: string[] = [];
  
  for (const varName of REQUIRED_VARS) {
    if (!import.meta.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    const error = `❌ Variáveis de ambiente obrigatórias não encontradas: ${missing.join(', ')}`;
    throw new Error(error);
  }
}

export function getEnvironmentConfig(): EnvironmentConfig {
  validateRequiredVariables();
  
  const config: EnvironmentConfig = {
    azureClientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    azureTenantId: import.meta.env.VITE_AZURE_TENANT_ID,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
    loginScopes: import.meta.env.VITE_AZURE_LOGIN_SCOPES?.split(','),
    groups: {
      geral: import.meta.env.VITE_AZURE_GROUP_GERAL,
      authAdmin: import.meta.env.VITE_AZURE_GROUP_AUTH_ADMIN,
      director: import.meta.env.VITE_AZURE_GROUP_DIRECTOR,
      finance: import.meta.env.VITE_AZURE_GROUP_FINANCE,
      manager: import.meta.env.VITE_AZURE_GROUP_MANAGER,
    }
  };
  
  return config;
}

export const ENV_CONFIG = getEnvironmentConfig();
