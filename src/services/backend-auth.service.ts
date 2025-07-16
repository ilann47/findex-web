import { ENV_CONFIG } from '../config/environment';

export interface UserRoleResponse {
  role: string;
  groups?: string[];
}

export class BackendAuthService {
  /**
   * Consulta a role do usuário Google no backend
   */
  static async fetchGoogleUserGroups(email: string, token: string): Promise<string[]> {
    try {
      const response = await fetch(`${ENV_CONFIG.gedvApiUrl}/user/role/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Provider': 'google',
          'X-User-Email': email // Incluir email para referência
        },
        mode: 'cors', // Explicitamente definir modo CORS
        credentials: 'omit' // Não incluir cookies
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        
        // Se é 404 ou usuário não encontrado, usa grupo padrão
        if (response.status === 404) {
          // Usuário não encontrado
        } else if (response.status === 401) {
          // Token inválido
        } else if (response.status === 403) {
          // Acesso negado
        }
        
        return [ENV_CONFIG.groups.cliente];
      }
      
      const data: UserRoleResponse = await response.json();
      
      // Mapear role para grupos (você pode ajustar esse mapeamento conforme necessário)
      const groups = this.mapRoleToGroups(data.role);
      
      return groups;
      
    } catch (error) {
      console.error('❌ BackendAuth: Erro ao consultar role no backend:', error);
      
      // Verificar se é erro de CORS
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('❌ BackendAuth: Possível erro de CORS - verifique configuração do backend');
      }
      
      // Em caso de erro de rede ou outro problema, usa grupo padrão
      return [ENV_CONFIG.groups.cliente];
    }
  }

  /**
   * Mapeia role do backend para grupos simplificados
   */
  private static mapRoleToGroups(role: string): string[] {
    switch (role?.toLowerCase()) {
      case 'admin':
      case 'administrador':
        // Admin tem acesso a todas as funcionalidades
        return [ENV_CONFIG.groups.admin, ENV_CONFIG.groups.promotor, ENV_CONFIG.groups.cliente];
      
      case 'promotor':
      case 'promoter':
        // Promotor tem acesso de promotor e cliente
        return [ENV_CONFIG.groups.promotor, ENV_CONFIG.groups.cliente];
      
      case 'cliente':
      case 'client':
      case 'user':
      case 'usuario':
      default:
        // Cliente tem apenas acesso básico
        return [ENV_CONFIG.groups.cliente];
    }
  }

  /**
   * Valida se o token Google ainda é válido no backend
   */
  static async validateGoogleToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${ENV_CONFIG.gedvApiUrl}/user/role/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Provider': 'google'
        },
        mode: 'cors',
        credentials: 'omit'
      });
      
      return response.ok;
    } catch (error) {
      console.error('❌ BackendAuth: Erro ao validar token:', error);
      return false;
    }
  }
}
