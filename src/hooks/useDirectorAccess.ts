import { useAuth } from './auth';
import { AZURE_GROUPS } from '../constants/groups';

export const useDirectorAccess = () => {
  const { user, userHasGroup } = useAuth();
  
  // Se a variável de ambiente não está configurada, não deve ter acesso
  if (!AZURE_GROUPS.ADMIN) {
    return {
      hasDirectorAccess: false,
      user
    };
  }
  
  // Verifica se o usuário tem o grupo de admin
  const hasGroupAccess = user && userHasGroup(AZURE_GROUPS.ADMIN);
  
  // Para usuários Azure, verificar roles também
  const hasRoleAccess = user && user.provider === 'azure' && 
    'roles' in user && user.roles?.includes('ADMIN');
  
  const hasDirectorAccess = hasGroupAccess || hasRoleAccess;
  
  return {
    hasDirectorAccess: !!hasDirectorAccess,
    user
  };
};
