export enum TravelStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface TravelDTO {
  travelId?: number;
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
  userId: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
}
