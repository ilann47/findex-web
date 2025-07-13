import { useAuth } from './useAuth';
import { AZURE_GROUPS } from '../constants/groups';

export const useDirectorAccess = () => {
  const { user, userHasGroup } = useAuth();
  
  // Se a variável de ambiente não está configurada, não deve ter acesso
  if (!AZURE_GROUPS.GRUPO_DIRECTOR) {
    return {
      hasDirectorAccess: false,
      user
    };
  }
  
  // Verifica se o usuário tem o grupo de diretor
  const hasGroupAccess = user && userHasGroup(AZURE_GROUPS.GRUPO_DIRECTOR);
  const hasRoleAccess = user && (user.idTokenClaims?.['roles'] as string[] || []).includes('DIRECTOR');
  
  const hasDirectorAccess = hasGroupAccess || hasRoleAccess;
  
  return {
    hasDirectorAccess: !!hasDirectorAccess,
    user
  };
};
