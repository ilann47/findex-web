import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { travelService } from '@/service/travels';
import { TravelDTO } from '@/types/travel';

interface UseTravelAccessReturn {
  hasAccess: boolean;
  isLoading: boolean;
  error: string | null;
  travel: TravelDTO | null;
}

export const useTravelAccess = (travelId: number): UseTravelAccessReturn => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [travel, setTravel] = useState<TravelDTO | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !travelId) {
        setHasAccess(false);
        setIsLoading(false);
        setError('Usuário não autenticado');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Tenta buscar a viagem específica
        const travelData = await travelService.getTravelById(travelId);
        
        // Verifica se o usuário tem acesso a esta viagem
        const userHasAccess = checkUserAccess(travelData, user);
        
        if (userHasAccess) {
          setTravel(travelData);
          setHasAccess(true);
        } else {
          setHasAccess(false);
          setError('Você não tem permissão para acessar esta viagem');
        }
      } catch (error: any) {
        console.error('❌ Erro ao verificar acesso à viagem:', error);
        setHasAccess(false);
        
        if (error.response?.status === 403) {
          setError('Acesso negado: você não tem permissão para ver esta viagem');
        } else if (error.response?.status === 404) {
          setError('Viagem não encontrada');
        } else {
          setError('Erro ao verificar acesso à viagem');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [travelId, user]);

  return { hasAccess, isLoading, error, travel };
};

// Função para verificar se o usuário tem acesso à viagem
const checkUserAccess = (travel: TravelDTO, user: any): boolean => {
  // Verifica se é o próprio usuário que criou a viagem
  if (travel.userId === user.id || travel.userId === user.oid) {
    return true;
  }

  // Verifica se o usuário tem role de admin ou manager
  const adminRoles = ['TRAVEL_ADMIN', 'TRAVEL_MANAGER', 'ADMIN'];
  if (user.roles?.some((role: string) => adminRoles.includes(role))) {
    return true;
  }

  // Aqui você pode adicionar outras lógicas de acesso, como:
  // - Verificar se é manager do departamento
  // - Verificar se está no mesmo projeto
  // - etc.

  return false;
};
