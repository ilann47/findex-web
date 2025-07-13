import { useAuth } from './useAuth';
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
    const userGroups = user.idTokenClaims?.['groups'] as string[] || [];

    // Verificar todos os grupos configurados
    Object.entries(AZURE_GROUPS).forEach(([groupKey, groupId]) => {
      if (groupId && userGroups.includes(groupId)) {
        const displayName = GROUP_DISPLAY_NAMES[groupId] || groupKey.replace('GRUPO_', '');
        roles.push({
          name: groupKey,
          displayName,
          type: groupKey === 'GRUPO_DIRECTOR' ? 'system' : 'business'
        });
      }
    });

    // Se não tem nenhum grupo específico, dar role padrão
    if (roles.length === 0) {
      roles.push({
        name: 'USER',
        displayName: 'Usuário',
        type: 'system'
      });
    }

    return roles;
  };

  const getUserRolesSummary = (): string => {
    const roles = getUserRoles();
    
    // Prioridade: Diretor > Gerente > Financeiro > Geral > Usuário
    const priorityOrder = ['GRUPO_DIRECTOR', 'GRUPO_MANAGER', 'GRUPO_FINANCE', 'GRUPO_GERAL'];
    
    for (const priority of priorityOrder) {
      const role = roles.find(r => r.name === priority);
      if (role) {
        return role.displayName;
      }
    }

    return roles[0]?.displayName || 'Usuário';
  };

  return {
    getUserRoles,
    getUserRolesSummary,
    hasDirectorAccess
  };
};
