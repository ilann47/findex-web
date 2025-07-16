interface EnvironmentConfig {
  // Azure AD Config
  azureClientId: string;
  azureTenantId: string;
  
  // Google OAuth Config
  googleClientId: string;
  
  // Common Config
  apiBaseUrl: string;
  gedvApiUrl: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  
  // Azure specific
  azureLoginScopes: string[];
  
  // Auth Provider Selection
  enabledProviders: ('azure' | 'google')[];
  defaultProvider: 'azure' | 'google';
  
  groups: {
    cliente: string;
    promotor: string;
    admin: string;
  };
}

function validateRequiredVariables(): void {
  const azureConfigured = !!(import.meta.env.VITE_AZURE_CLIENT_ID && import.meta.env.VITE_AZURE_TENANT_ID);
  const googleConfigured = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!azureConfigured && !googleConfigured) {
    throw new Error('❌ Pelo menos um provedor de autenticação deve estar configurado (Azure AD ou Google)');
  }
  
  // Validar configuração específica do Azure se estiver habilitado
  if (import.meta.env.VITE_AZURE_CLIENT_ID && !import.meta.env.VITE_AZURE_TENANT_ID) {
    throw new Error('❌ VITE_AZURE_TENANT_ID é obrigatório quando Azure AD está habilitado');
  }
}

export function getEnvironmentConfig(): EnvironmentConfig {
  validateRequiredVariables();
  
  // Detectar quais provedores estão habilitados
  const azureEnabled = !!(import.meta.env.VITE_AZURE_CLIENT_ID && import.meta.env.VITE_AZURE_TENANT_ID);
  const googleEnabled = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  const enabledProviders: ('azure' | 'google')[] = [];
  if (azureEnabled) enabledProviders.push('azure');
  if (googleEnabled) enabledProviders.push('google');
  
  // Determinar provedor padrão
  const defaultProvider = import.meta.env.VITE_DEFAULT_AUTH_PROVIDER as 'azure' | 'google' || 
                         (azureEnabled ? 'azure' : 'google');
  
  const config: EnvironmentConfig = {
    // Azure Config
    azureClientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    azureTenantId: import.meta.env.VITE_AZURE_TENANT_ID || '',
    
    // Google Config
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    
    // Common Config
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    gedvApiUrl: import.meta.env.VITE_GEDV_API_URL || 'http://localhost:8080',
    redirectUri: import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/auth/callback`,
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || `${window.location.origin}/login`,
    
    // Azure specific
    azureLoginScopes: import.meta.env.VITE_AZURE_LOGIN_SCOPES?.split(',') || ['User.Read'],
    
    // Provider selection
    enabledProviders,
    defaultProvider,
    
    groups: {
      cliente: import.meta.env.VITE_AZURE_GROUP_CLIENTE || 'cliente',
      promotor: import.meta.env.VITE_AZURE_GROUP_PROMOTOR || 'promotor',
      admin: import.meta.env.VITE_AZURE_GROUP_ADMIN || 'admin',
    }
  };
  
  return config;
}

export const ENV_CONFIG = getEnvironmentConfig();
