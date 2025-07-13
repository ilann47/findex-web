import { TravelDTO, TravelStatus } from '@/types/travel';
import { TravelFilters } from '@/components/travels/TravelFilters';

export const filterTravels = (travels: TravelDTO[], filters: TravelFilters): TravelDTO[] => {
  return travels.filter(travel => {
    // Filtro por status - adiciona mapeamento para status antigos
    if (filters.status !== 'ALL') {
      let travelStatus = travel.status as string;
      
      // Mapeia status antigos para novos
      const statusMapping: Record<string, string> = {
        'APPROVED': 'ATIVO',
        'PENDING': 'INATIVO', 
        'CANCELLED': 'CANCELADO',
        'COMPLETED': 'CONCLUIDO',
        'REJECTED': 'CANCELADO'
      };
      
      // Se o status existe no mapeamento, usa o novo valor
      if (statusMapping[travelStatus]) {
        travelStatus = statusMapping[travelStatus];
      }
      
      if (travelStatus !== filters.status) {
        return false;
      }
    }

    // Filtro por origem
    if (filters.origin && !travel.origin.toLowerCase().includes(filters.origin.toLowerCase())) {
      return false;
    }

    // Filtro por destino
    if (filters.destination && !travel.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }

    // Filtro por data de início
    if (filters.startDate && travel.startDate < filters.startDate) {
      return false;
    }

    // Filtro por data de fim
    if (filters.endDate && travel.endDate > filters.endDate) {
      return false;
    }

    // Filtro de busca geral (origem, destino ou objetivo)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchFields = [
        travel.origin,
        travel.destination,
        travel.purpose
      ];
      
      const hasMatch = searchFields.some(field => 
        field.toLowerCase().includes(searchTerm)
      );
      
      if (!hasMatch) {
        return false;
      }
    }

    return true;
  });
};

export const getTravelStatusCounts = (travels: TravelDTO[]) => {
  return {
    all: travels.length,
    ativo: travels.filter(t => t.status === TravelStatus.ATIVO).length,
    inativo: travels.filter(t => t.status === TravelStatus.INATIVO).length,
    concluido: travels.filter(t => t.status === TravelStatus.CONCLUIDO).length,
    cancelado: travels.filter(t => t.status === TravelStatus.CANCELADO).length,
  };
};

export const getActiveTravels = (travels: TravelDTO[]): TravelDTO[] => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  return travels.filter(travel => {
    // Viagem deve estar ativa
    if (travel.status !== TravelStatus.ATIVO) {
      return false;
    }
    
    // Data de fim deve ser futura ou hoje
    return travel.endDate >= today;
  });
};
