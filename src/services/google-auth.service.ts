import { GoogleUser, GoogleTokenInfo } from '../types/auth';
import { googleConfig } from '../authConfig';

// Declaração global para Google Identity Services (GIS)
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
          revoke: (email: string, callback: () => void) => void;
        };
        oauth2: {
          initTokenClient: (config: any) => any;
          hasGrantedAllScopes: (token: any, ...scopes: string[]) => boolean;
        };
      };
    };
  }
}

export class GoogleAuthService {
  private static isInitialized = false;
  private static tokenClient: any = null;
  private static currentUser: GoogleUser | null = null;

  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    
    if (!googleConfig.clientId) {
      return;
    }

    try {
      // Carregar o script do Google Identity Services (novo)
      await this.loadGoogleScript();

      // Inicializar o cliente de token OAuth2
      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: googleConfig.clientId,
        scope: googleConfig.scope,
        callback: (response: any) => {
          if (response.error) {
            console.error('❌ Google Auth: Erro no token callback:', response.error);
            return;
          }
          
          this.handleTokenResponse(response);
        },
      });

      this.isInitialized = true;
    } catch (error: any) {
      console.error('❌ Google Auth: Erro na inicialização:', error);
      
      // Se o erro for de origem não válida, não tratar como erro crítico
      if (error?.error === 'idpiframe_initialization_failed') {
        // Marcar como "inicializado" para evitar loops, mas sem instance
        this.isInitialized = true;
        this.tokenClient = null;
        return; // Não lançar erro, apenas logar warning
      }
      
      // Para outros tipos de erro, também não quebrar completamente
      this.isInitialized = true;
      this.tokenClient = null;
    }
  }

  static async login(): Promise<GoogleUser> {
    await this.initialize();

    // Construir URL de autorização para redirect
    const authUrl = this.buildAuthUrl();
    
    // Redirecionar para Google OAuth (mesma aba, sem popup)
    window.location.href = authUrl;
    
    // Esta Promise nunca será resolvida porque haverá redirect
    // O tratamento será feito no callback de autorização
    return new Promise(() => {});
  }

  private static buildAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: googleConfig.clientId,
      redirect_uri: googleConfig.redirectUri,
      response_type: 'id_token token', // Obter tanto ID token quanto access token
      scope: `${googleConfig.scope} openid profile email`,
      state: 'google_oauth',
      nonce: Date.now().toString() // Nonce para segurança
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static async logout(): Promise<void> {
    if (!this.currentUser) {
      return;
    }

    try {
      // Revogar o acesso se possível
      if (window.google?.accounts?.id?.revoke) {
        window.google.accounts.id.revoke(this.currentUser.email, () => {
          // Token revogado
        });
      }
      
      this.currentUser = null;
    } catch (error) {
      console.error('Erro no logout Google:', error);
      throw new Error('Falha no logout do Google');
    }
  }

  static async getAccessToken(): Promise<string | null> {
    // Com GIS, o token é obtido durante o login
    // Para implementação completa, seria necessário armazenar o token
    return null;
  }

  static async getTokenInfo(): Promise<GoogleTokenInfo | null> {
    // Implementação simplificada - seria necessário armazenar informações do token
    return null;
  }

  static getCurrentUser(): GoogleUser | null {
    return this.currentUser;
  }

  private static async fetchUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    
    if (!response.ok) {
      throw new Error('Falha ao obter informações do usuário');
    }

    const data = await response.json();
    
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
      provider: 'google',
      domain: data.email.split('@')[1],
      emailVerified: data.verified_email || true
    };
  }

  private static handleTokenResponse(response: any): void {
    // Método auxiliar para lidar com respostas de token
  }

  private static loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar se já foi carregado
      if (window.google?.accounts) {
        resolve();
        return;
      }

      // Verificar se script já existe no DOM
      const existingScript = document.querySelector('script[src*="accounts.google.com"]');
      if (existingScript) {
        // Aguardar API ficar disponível
        const waitForAPI = () => {
          if (window.google?.accounts) {
            resolve();
          } else {
            setTimeout(waitForAPI, 100);
          }
        };
        
        waitForAPI();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Aguardar API estar disponível com timeout
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos
        
        const checkAPI = () => {
          attempts++;
          
          if (window.google?.accounts) {
            resolve();
          } else if (attempts >= maxAttempts) {
            console.error('❌ Google Script: Timeout aguardando API');
            reject(new Error('Timeout: Google API não ficou disponível'));
          } else {
            setTimeout(checkAPI, 100);
          }
        };
        
        checkAPI();
      };
      
      script.onerror = (e) => {
        console.error('❌ Google Script: Erro ao carregar:', e);
        reject(new Error('Falha ao carregar Google Identity Services'));
      };
      
      document.head.appendChild(script);
    });
  }

  static isSignedIn(): boolean {
    return !!this.currentUser;
  }

  // Método para trocar código por token (chamado do callback)
  static async exchangeCodeForToken(code: string): Promise<GoogleUser> {
    try {
      // Para aplicações frontend, normalmente usaríamos um backend para esta troca
      // Como alternativa, podemos redirecionar para o Google novamente com token flow
      const tokenUrl = this.buildTokenUrl(code);
      window.location.href = tokenUrl;
      
      // Esta Promise nunca será resolvida porque haverá outro redirect
      return new Promise(() => {});
    } catch (error) {
      console.error('❌ Google Auth: Erro na troca do código:', error);
      throw error;
    }
  }

  private static buildTokenUrl(code: string): string {
    // Construir URL para obter token usando implicit flow
    const params = new URLSearchParams({
      client_id: googleConfig.clientId,
      redirect_uri: googleConfig.redirectUri,
      response_type: 'token', // Solicitar token diretamente
      scope: googleConfig.scope,
      state: 'google_token'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
}
