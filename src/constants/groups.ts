import { ENV_CONFIG } from '../config/environment';

// IDs dos grupos - agora simplificados
export const AZURE_GROUPS = {
  CLIENTE: ENV_CONFIG.groups.cliente,
  PROMOTOR: ENV_CONFIG.groups.promotor,
  ADMIN: ENV_CONFIG.groups.admin,
} as const;

// Mapeamento de nomes amigáveis para os grupos
export const GROUP_DISPLAY_NAMES: Record<string, string> = {
  [AZURE_GROUPS.CLIENTE]: 'Cliente',
  [AZURE_GROUPS.PROMOTOR]: 'Promotor',
  [AZURE_GROUPS.ADMIN]: 'Administrador',
} as const;

export const ROLE_GROUP_MAPPING: Record<string, string> = {
  // Mapeamento simplificado de permissions para grupos
  'TRAVEL_LIST': AZURE_GROUPS.CLIENTE,
  'TRAVEL_CREATE': AZURE_GROUPS.PROMOTOR,
  'TRAVEL_UPDATE': AZURE_GROUPS.PROMOTOR,
  'TRAVEL_DELETE': AZURE_GROUPS.ADMIN,
  'USER_MANAGEMENT': AZURE_GROUPS.ADMIN,
  'REPORTS_VIEW': AZURE_GROUPS.PROMOTOR,
} as const;
