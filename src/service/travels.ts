import { TravelDTO, CreateTravelRequest, TravelStatus } from '@/types/travel';
import { gedvAPI } from '@/shared/gedv';

class TravelService {
  async getAllTravels(status?: string): Promise<TravelDTO[]> {
    try {
      let endpoint = '/travels/azure';
      
      // Add status filter if provided
      if (status) {
        endpoint += `?status=${encodeURIComponent(status)}`;
      }
      
      const response = await gedvAPI.get(endpoint);
      const data = response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('❌ Erro ao buscar viagens:', error);
      return [];
    }
  }

  // Get active travels (ativo and not expired)
  async getActiveTravels(): Promise<TravelDTO[]> {
    try {
      const response = await gedvAPI.get('/travels/azure?status=ATIVO');
      const travels = response.data;
      
      // Filter out expired travels on client side
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      const activeTravels = travels.filter((travel: TravelDTO) => travel.endDate >= today);
      return Array.isArray(activeTravels) ? activeTravels : [];
    } catch (error) {
      console.error('❌ Erro ao buscar viagens ativas:', error);
      return [];
    }
  }

  async getTravelById(travelId: number): Promise<TravelDTO> {
    try {
      const response = await gedvAPI.get(`/travels/${travelId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar viagem:', error);
      throw error;
    }
  }

  async createTravel(travelData: CreateTravelRequest): Promise<TravelDTO> {
    try {
      console.log('🔄 Tentando criar viagem via API...', travelData);
      const response = await gedvAPI.post('/travels', travelData);
      console.log('✅ Resposta da API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro detalhado ao criar viagem:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          headers: error.config?.headers
        }
      });
      throw error;
    }
  }

  async updateTravel(travelId: number, travelData: Partial<TravelDTO>): Promise<TravelDTO> {
    try {
      const response = await gedvAPI.put(`/travels/${travelId}`, travelData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar viagem:', error);
      throw error;
    }
  }

  async deleteTravel(travelId: number): Promise<void> {
    try {
      await gedvAPI.delete(`/travels/${travelId}`);
    } catch (error) {
      console.error('❌ Erro ao deletar viagem:', error);
      throw error;
    }
  }
}

export const travelService = new TravelService();
