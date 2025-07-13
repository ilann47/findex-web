import { ENV_CONFIG } from '../config/environment';

// IDs dos grupos do Azure AD
export const AZURE_GROUPS = {
  GRUPO_GERAL: ENV_CONFIG.groups.geral,
  GRUPO_DIRECTOR: ENV_CONFIG.groups.director,
  GRUPO_FINANCE: ENV_CONFIG.groups.finance,
  GRUPO_MANAGER: ENV_CONFIG.groups.manager,
} as const;

// Mapeamento de nomes amigáveis para os grupos
export const GROUP_DISPLAY_NAMES: Record<string, string> = {
  [AZURE_GROUPS.GRUPO_GERAL]: 'Usuário Geral',
  [AZURE_GROUPS.GRUPO_DIRECTOR]: 'Diretor',
  [AZURE_GROUPS.GRUPO_FINANCE]: 'Financeiro',
  [AZURE_GROUPS.GRUPO_MANAGER]: 'Gerente',
} as const;

export const ROLE_GROUP_MAPPING: Record<string, string> = {
  // As permissions de travel serão mapeadas para o grupo geral por enquanto
  'TRAVEL_LIST': AZURE_GROUPS.GRUPO_GERAL,
  'TRAVEL_CREATE': AZURE_GROUPS.GRUPO_GERAL,
  'TRAVEL_UPDATE': AZURE_GROUPS.GRUPO_GERAL,
  'TRAVEL_DELETE': AZURE_GROUPS.GRUPO_GERAL,
} as const;
