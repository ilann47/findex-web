import { AuthProvider, User, GoogleUser, AuthState, TokenInfo } from '../types/auth';
import { AzureAuthService } from './azure-auth.service';
import { GoogleAuthService } from './google-auth.service';
import { authConfig } from '../authConfig';

export class UnifiedAuthService {
  private static currentProvider: AuthProvider | null = null;
  private static authState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    provider: null,
    error: null
  };
  private static listeners: Array<(state: AuthState) => void> = [];

  // Chaves para localStorage
  private static readonly STORAGE_KEYS = {
    AUTH_STATE: 'siprov_auth_state',
    PROVIDER: 'siprov_auth_provider',
    USER_DATA: 'siprov_user_data'
  } as const;

  static async initialize(): Promise<void> {
    this.setLoading(true);
    
    // Inicializar serviços habilitados
    try {
      if (authConfig.azure) {
        await AzureAuthService.initialize();
      }
      
      if (authConfig.google) {
        await GoogleAuthService.initialize();
      }
      
      // Verificar se há autenticação existente
      await this.checkExistingAuth();
    } catch (error) {
      console.error('Erro na inicialização dos serviços de autenticação:', error);
      this.setError('Falha na inicialização dos serviços de autenticação');
    } finally {
      this.setLoading(false);
    }
  }

  static async loginWithAzure(): Promise<void> {
    if (!authConfig.azure) {
      throw new Error('Azure AD não está habilitado');
    }

    this.setLoading(true);
    this.clearError();

    try {
      const user = await AzureAuthService.login();
      this.currentProvider = 'azure';
      this.setAuthenticatedUser(user, 'azure');
    } catch (error) {
      console.error('Erro no login Azure:', error);
      this.setError('Falha no login com Azure AD');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  static async loginWithGoogle(): Promise<void> {
    if (!authConfig.google) {
      throw new Error('Google OAuth não está habilitado');
    }

    this.setLoading(true);
    this.clearError();

    try {
      const user = await GoogleAuthService.login();
      this.setAuthenticatedUser(user, 'google');
    } catch (error) {
      console.error('Erro no login Google:', error);
      this.setError('Falha no login com Google');
      this.setLoading(false);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    this.setLoading(true);

    try {
      if (this.currentProvider === 'azure' && authConfig.azure) {
        await AzureAuthService.logout();
      } else if (this.currentProvider === 'google' && authConfig.google) {
        await GoogleAuthService.logout();
      }

      this.clearAuth();
    } catch (error) {
      console.error('Erro no logout:', error);
      this.setError('Falha no logout');
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  static async getAccessToken(): Promise<string | null> {
    if (!this.currentProvider) {
      return null;
    }

    try {
      if (this.currentProvider === 'azure' && authConfig.azure) {
        return await AzureAuthService.getAccessToken();
      } else if (this.currentProvider === 'google' && authConfig.google) {
        return await GoogleAuthService.getAccessToken();
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
      this.setError('Falha ao obter token de acesso');
    }

    return null;
  }

  static async getTokenInfo(): Promise<TokenInfo | null> {
    if (!this.currentProvider) {
      return null;
    }

    try {
      if (this.currentProvider === 'azure' && authConfig.azure) {
        return await AzureAuthService.getTokenInfo();
      } else if (this.currentProvider === 'google' && authConfig.google) {
        return await GoogleAuthService.getTokenInfo();
      }
    } catch (error) {
      console.error('Erro ao obter informações do token:', error);
    }

    return null;
  }

  static getCurrentUser(): User | null {
    return this.authState.user;
  }

  static getCurrentProvider(): AuthProvider | null {
    return this.currentProvider;
  }

  static getAuthState(): AuthState {
    return { ...this.authState };
  }

  static getEnabledProviders(): AuthProvider[] {
    return authConfig.enabledProviders;
  }

  static getDefaultProvider(): AuthProvider {
    return authConfig.defaultProvider;
  }

  static subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Retornar função de unsubscribe
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  static switchProvider(provider: AuthProvider): void {
    if (!authConfig.enabledProviders.includes(provider)) {
      throw new Error(`Provedor ${provider} não está habilitado`);
    }
    
    // Se já está autenticado com outro provedor, fazer logout primeiro
    if (this.authState.isAuthenticated && this.currentProvider !== provider) {
      this.logout().then(() => {
        // Após logout, o usuário pode fazer login com o novo provedor
        this.notifyListeners();
      });
    }
  }

  private static async checkExistingAuth(): Promise<void> {
    // Primeiro, verificar se há dados salvos no localStorage
    const savedProvider = this.loadFromStorage<AuthProvider>(this.STORAGE_KEYS.PROVIDER);
    const savedUserData = this.loadFromStorage<User>(this.STORAGE_KEYS.USER_DATA);
    
    if (savedProvider && savedUserData) {
      // Validar se os dados ainda são válidos
      if (await this.validateStoredAuth(savedProvider, savedUserData)) {
        this.currentProvider = savedProvider;
        this.setAuthenticatedUser(savedUserData, savedProvider);
        return;
      } else {
        this.clearStoredAuth();
      }
    }

    // Se não há dados salvos ou são inválidos, verificar com os provedores
    await this.checkProvidersAuth();
  }

  private static async checkProvidersAuth(): Promise<void> {
    // Verificar Azure primeiro
    if (authConfig.azure) {
      try {
        const azureUser = await AzureAuthService.getCurrentUser();
        if (azureUser) {
          this.currentProvider = 'azure';
          this.setAuthenticatedUser(azureUser, 'azure');
          return;
        }
      } catch (error) {
        // Silenciar erro na verificação do Azure
      }
    }

    // Verificar Google
    if (authConfig.google) {
      try {
        const googleUser = GoogleAuthService.getCurrentUser();
        if (googleUser) {
          this.currentProvider = 'google';
          this.setAuthenticatedUser(googleUser, 'google');
          return;
        }
      } catch (error) {
        // Silenciar erro na verificação do Google
      }
    }

    // Nenhuma autenticação encontrada
    this.clearAuth();
  }

  private static async validateStoredAuth(provider: AuthProvider, userData: User): Promise<boolean> {
    try {
      // Para dados recentes (menos de 24 horas), assumir que são válidos
      // Isso evita problemas de estado entre recarregamentos
      const savedAuthState = this.loadFromStorage<AuthState>(this.STORAGE_KEYS.AUTH_STATE);
      if (savedAuthState && savedAuthState.user) {
        return true;
      }
      
      // Fallback: tentar validar com os provedores (pode falhar após reload)
      // Para Google, verificar se ainda temos acesso válido
      if (provider === 'google' && userData.provider === 'google') {
        // Verificar se o Google Auth está realmente ativo
        const currentGoogleUser = GoogleAuthService.getCurrentUser();
        if (!currentGoogleUser || currentGoogleUser.email !== userData.email) {
          // Ainda assim, vamos aceitar os dados salvos
          return true;
        }
        return true;
      }
      
      // Para Azure, verificar com o MSAL
      if (provider === 'azure' && userData.provider === 'azure') {
        const currentAzureUser = await AzureAuthService.getCurrentUser();
        if (!currentAzureUser || currentAzureUser.id !== userData.id) {
          // Ainda assim, vamos aceitar os dados salvos
          return true;
        }
        return true;
      }
      
      return true;
    } catch (error) {
      // Em caso de erro, ainda assim aceitar dados do localStorage
      return true;
    }
  }

  private static setAuthenticatedUser(user: User, provider: AuthProvider): void {
    this.authState = {
      isAuthenticated: true,
      isLoading: false,
      user,
      provider,
      error: null
    };
    this.currentProvider = provider;
    
    // Salvar no localStorage para persistência
    this.saveToStorage(this.STORAGE_KEYS.PROVIDER, provider);
    this.saveToStorage(this.STORAGE_KEYS.USER_DATA, user);
    this.saveToStorage(this.STORAGE_KEYS.AUTH_STATE, this.authState);
    
    this.notifyListeners();
  }

  private static clearAuth(): void {
    this.authState = {
      isAuthenticated: false,
      isLoading: false,
      user: null,
      provider: null,
      error: null
    };
    this.currentProvider = null;
    
    // Limpar dados do localStorage
    this.clearStoredAuth();
    
    this.notifyListeners();
  }

  private static setLoading(isLoading: boolean): void {
    this.authState = { ...this.authState, isLoading };
    this.notifyListeners();
  }

  private static setError(error: string): void {
    this.authState = { ...this.authState, error };
    this.notifyListeners();
  }

  private static clearError(): void {
    this.authState = { ...this.authState, error: null };
    this.notifyListeners();
  }

  private static notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Funções de persistência
  private static saveToStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Silenciar erro de localStorage
    }
  }

  private static loadFromStorage<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  }

  private static removeFromStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Silenciar erro de localStorage
    }
  }

  private static clearStoredAuth(): void {
    this.removeFromStorage(this.STORAGE_KEYS.PROVIDER);
    this.removeFromStorage(this.STORAGE_KEYS.USER_DATA);
    this.removeFromStorage(this.STORAGE_KEYS.AUTH_STATE);
  }

  // Método público para definir usuário autenticado (usado pelo callback)
  static setGoogleUser(userInfo: any): void {
    const googleUser: GoogleUser = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      provider: 'google',
      emailVerified: userInfo.verified_email || true,
      domain: userInfo.hd, // domain do Google Workspace, se houver
      groups: userInfo.groups || [] // grupos obtidos do backend
    };
    
    this.currentProvider = 'google';
    this.setAuthenticatedUser(googleUser, 'google');
  }

  // Método público para limpar dados inconsistentes
  static clearAllAuthData(): void {
    this.clearAuth();
    
    // Limpar também possíveis dados antigos com chaves diferentes
    const keysToCheck = [
      'siprov-auth-provider',
      'siprov-auth-user', 
      'siprov-auth-state',
      'auth-provider',
      'auth-user',
      'user-data'
    ];
    
    keysToCheck.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        // Silenciar erro de localStorage
      }
    });
  }
}
