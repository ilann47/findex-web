export enum TravelStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  CANCELADO = 'CANCELADO',
  CONCLUIDO = 'CONCLUIDO'
}

export interface TravelDTO {
  travelId?: number;
  id?: number; // Possível campo alternativo da API
  userId: string;
  origin: string;
  destination: string;
  startDate: string; 
  endDate: string; 
  purpose: string;
  status: TravelStatus;
  createdAt?: string; 
  updatedAt?: string;
}

export interface CreateTravelRequest {
  userId?: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status?: TravelStatus;
}
