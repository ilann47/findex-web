import { TravelDTO, CreateTravelRequest } from '@/types/travel';
import { ENDPOINTS } from '@/constants/endpoints';
import { createAuthHeaders } from '@/utils/auth-headers';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || '/api'}/${ENDPOINTS.TRAVELS}`;

export const travelService = {
  async getAllTravels(): Promise<TravelDTO[]> {
    try {
      const headers = await createAuthHeaders();
      
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createTravel(travelData: CreateTravelRequest): Promise<TravelDTO> {
    try {
      const headers = await createAuthHeaders();
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(travelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async updateTravel(travelId: number, travelData: Partial<TravelDTO>): Promise<TravelDTO> {
    try {
      const headers = await createAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/${travelId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(travelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async deleteTravel(travelId: number): Promise<void> {
    try {
      const headers = await createAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/${travelId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  },

  async getTravelById(travelId: number): Promise<TravelDTO> {
    try {
      const headers = await createAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/${travelId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
