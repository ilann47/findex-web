import { useAuth as useHybridAuth } from '../../provider/hybrid-auth';
import { ROLE_GROUP_MAPPING } from '@/constants/groups';

/**
 * Hook de compatibilidade que mantém a interface original do useAuth
 * mas usa o sistema de autenticação híbrido por baixo.
 */
export const useAuth = () => {
  const hybridAuth = useHybridAuth();

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = (): boolean => {
    return hybridAuth.isAuthenticated;
  };

  /**
   * Verifica se o usuário logado pertence a um grupo específico.
   * @param groupID O ID do grupo a ser verificado ou nome da role
   * @returns `true` se o usuário pertencer ao grupo, `false` caso contrário.
   */
  const userHasGroup = (groupID: string): boolean => {
    const user = hybridAuth.user;
    
    if (!user || !groupID) {
      return false;
    }

    // Para usuários Azure, usar lógica de grupos existente
    if (user.provider === 'azure' && 'groups' in user) {
      const groups = user.groups || [];
      const roles = user.roles || [];

      // Se é um ID de grupo direto (GUID), verifica diretamente
      if (groupID.includes('-') && groupID.length > 30) {
        return groups.includes(groupID);
      }

      // Se é uma role nomeada, usa o mapeamento
      const mappedGroupId = ROLE_GROUP_MAPPING[groupID];
      if (mappedGroupId) {
        return groups.includes(mappedGroupId);
      }

      // Fallback: verifica se existe o grupo com prefixo ROLE_
      const roleBasedGroup = `ROLE_${groupID}`;
      return roles.includes(roleBasedGroup);
    }

    // Para usuários Google, implementar lógica simples baseada em domínio
    if (user.provider === 'google' && 'domain' in user) {
      // TODO: Implementar lógica de grupos para Google
      // Por enquanto, todos os usuários Google têm acesso como cliente
      return groupID === 'CLIENTE';
    }

    return false;
  };

  /**
   * Verifica se o usuário tem uma role específica
   * @param roleName Nome da role
   * @returns boolean
   */
  const userHasRole = (roleName: string): boolean => {
    return userHasGroup(roleName);
  };

  /**
   * Obtém informações do usuário atual
   */
  const getUserInfo = () => {
    return hybridAuth.user;
  };

  /**
   * Faz login (usa o provedor padrão)
   */
  const login = async () => {
    // Usar o provedor padrão
    const defaultProvider = hybridAuth.user?.provider || 
                           (import.meta.env.VITE_DEFAULT_AUTH_PROVIDER as 'azure' | 'google') || 
                           'azure';
    
    if (defaultProvider === 'azure') {
      await hybridAuth.loginWithAzure();
    } else {
      await hybridAuth.loginWithGoogle();
    }
  };

  /**
   * Faz logout
   */
  const logout = async () => {
    await hybridAuth.logout();
  };

  /**
   * Obtém o token de acesso
   */
  const getAccessToken = async (): Promise<string | null> => {
    return await hybridAuth.getAccessToken();
  };

  // Interface de compatibilidade com o hook original
  return {
    // Estados
    isAuthenticated: hybridAuth.isAuthenticated,
    isLoading: hybridAuth.isLoading,
    user: hybridAuth.user,
    error: hybridAuth.error,
    
    // Métodos de compatibilidade
    isAuthenticatedFn: isAuthenticated,
    userHasGroup,
    userHasRole,
    getUserInfo,
    login,
    logout,
    getAccessToken,
    
    // Novos métodos híbridos
    loginWithAzure: hybridAuth.loginWithAzure,
    loginWithGoogle: hybridAuth.loginWithGoogle,
    switchProvider: hybridAuth.switchProvider,
    provider: hybridAuth.provider,
    
    // Para compatibilidade com código existente que espera um array accounts
    accounts: hybridAuth.user ? [hybridAuth.user] : [],
  };
};

/**
 * Hook específico para verificar se é admin
 */
export const useDirectorAccess = () => {
  const { userHasGroup, user } = useAuth();
  
  const isDirector = user && userHasGroup('ADMIN');
  
  return {
    isDirector,
    hasAccess: isDirector
  };
};

export default useAuth;
