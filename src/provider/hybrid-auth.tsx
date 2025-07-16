import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthContextType, AuthState, AuthProvider } from '../types/auth';
import { UnifiedAuthService } from '../services/unified-auth.service';

const AuthContext = createContext<AuthContextType | null>(null);

interface HybridAuthProviderProps {
  children: ReactNode;
}

export const HybridAuthProvider: React.FC<HybridAuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    provider: null,
    error: null
  });

  useEffect(() => {
    // Inicializar o serviço de autenticação
    const initAuth = async () => {
      try {
        await UnifiedAuthService.initialize();
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      }
    };

    initAuth();

    // Inscrever para mudanças no estado de auth
    const unsubscribe = UnifiedAuthService.subscribe((newState) => {
      setAuthState(newState);
    });

    // Obter estado inicial
    setAuthState(UnifiedAuthService.getAuthState());

    return unsubscribe;
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    loginWithAzure: async () => {
      await UnifiedAuthService.loginWithAzure();
    },
    loginWithGoogle: async () => {
      await UnifiedAuthService.loginWithGoogle();
    },
    logout: async () => {
      await UnifiedAuthService.logout();
    },
    switchProvider: (provider: AuthProvider) => {
      UnifiedAuthService.switchProvider(provider);
    },
    getAccessToken: async () => {
      return await UnifiedAuthService.getAccessToken();
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de HybridAuthProvider');
  }
  return context;
};
