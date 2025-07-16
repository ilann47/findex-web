// Arquivo: src/hooks/auth/index.ts (VERSÃO HÍBRIDA COM COMPATIBILIDADE)

import { useAuth as useHybridAuth } from '../../provider/hybrid-auth';

/**
 * Hook de compatibilidade que mantém a interface original mas usa o sistema híbrido
 * @deprecated Componentes novos devem usar useAuth do provider híbrido diretamente
 */
export const useAuth = () => {
    const { 
        user: hybridUser, 
        isAuthenticated, 
        logout: hybridLogout,
        loginWithAzure,
        loginWithGoogle 
    } = useHybridAuth();

    // Função para verificar se o usuário tem um grupo/role específico
    const userHasGroup = (groupID: string): boolean => {
        if (!hybridUser) return false;
        
        // Se for um usuário Azure, verificar nos grupos
        if (hybridUser.provider === 'azure') {
            const groups = hybridUser.groups || [];
            const hasGroup = groups.includes(groupID);
            return hasGroup;
        }
        
        // Para usuários Google, verificar nos grupos vindos do backend
        if (hybridUser.provider === 'google') {
            const groups = hybridUser.groups || [];
            const hasGroup = groups.includes(groupID);
            return hasGroup;
        }
        
        return false;
    };

    // Função de logout que funciona com ambos os provedores
    const logout = async () => {
        try {
            await hybridLogout();
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    };

    // Função de login compatível (usa Azure por padrão para compatibilidade)
    const login = async () => {
        try {
            await loginWithAzure();
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    };

    // Mapear o usuário híbrido para o formato antigo (compatibilidade)
    const legacyUser = hybridUser ? {
        ...hybridUser,
        idTokenClaims: hybridUser.provider === 'azure' 
            ? { groups: hybridUser.groups } 
            : undefined,
        // Campos para compatibilidade com o formato antigo do MSAL
        username: hybridUser.email,
        name: hybridUser.name,
        homeAccountId: hybridUser.id
    } : undefined;

    return {
        user: legacyUser,
        isAuthenticated,
        userHasGroup,
        logout,
        login,
        // Manter também as funções específicas para componentes que queiram usar
        loginWithAzure,
        loginWithGoogle
    };
};