import { useAuth } from './auth';
import { useDirectorAccess } from './useDirectorAccess';
import { AZURE_GROUPS, GROUP_DISPLAY_NAMES } from '../constants/groups';

export interface UserRole {
  name: string;
  displayName: string;
  type: 'system' | 'business';
}

export const useUserRoles = () => {
  const { user } = useAuth();
  const { hasDirectorAccess } = useDirectorAccess();

  const getUserRoles = (): UserRole[] => {
    if (!user) return [];

    const roles: UserRole[] = [];
    
    // Para usuários híbridos (Azure/Google), buscar grupos do user.groups
    // Para compatibilidade com Azure AD, também verificar idTokenClaims
    const userGroups = user.groups || 
                      (user.idTokenClaims?.['groups'] as string[]) || 
                      [];

    // Verificar todos os grupos configurados
    Object.entries(AZURE_GROUPS).forEach(([groupKey, groupId]) => {
      if (groupId && userGroups.includes(groupId)) {
        const displayName = GROUP_DISPLAY_NAMES[groupId] || groupKey;
        roles.push({
          name: groupKey,
          displayName,
          type: groupKey === 'ADMIN' ? 'system' : 'business'
        });
      }
    });

    // Se não tem nenhum grupo específico, dar role padrão
    if (roles.length === 0) {
      roles.push({
        name: 'CLIENTE',
        displayName: 'Cliente',
        type: 'system'
      });
    }

    return roles;
  };

  const getUserRolesSummary = (): string => {
    const roles = getUserRoles();
    
    // Prioridade: Admin > Promotor > Cliente
    const priorityOrder = ['ADMIN', 'PROMOTOR', 'CLIENTE'];
    
    for (const priority of priorityOrder) {
      const role = roles.find(r => r.name === priority);
      if (role) {
        return role.displayName;
      }
    }

    return roles[0]?.displayName || 'Cliente';
  };

  return {
    getUserRoles,
    getUserRolesSummary,
    hasDirectorAccess
  };
};
