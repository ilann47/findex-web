export enum ExpenseType {
  ACCOMMODATION = 'ACCOMMODATION',
  MEALS = 'MEALS',
  TRANSPORT = 'TRANSPORT',
  FUEL = 'FUEL',
  PARKING = 'PARKING',
  OTHER = 'OTHER'
}

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface ExpenseDTO {
  expenseId?: number;
  travelId: number;
  type: ExpenseType;
  description: string;
  amount: number;
  currency: string;
  date: string;
  status: ExpenseStatus;
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExpenseRequest {
  travelId: number;
  type: ExpenseType;
  description: string;
  amount: number;
  currency: string;
  date: string;
  attachments?: File[];
}

export enum AdvanceRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'
}

export interface AdvanceRequestDTO {
  advanceId?: number;
  travelId: number;
  amount: number;
  currency: string;
  justification: string;
  status: AdvanceRequestStatus;
  requestDate: string;
  approvalDate?: string;
  paymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdvanceRequest {
  travelId: number;
  amount: number;
  currency: string;
  justification: string;
}

export enum ReimbursementType {
  MILEAGE = 'MILEAGE',
  OTHER = 'OTHER'
}

export enum ReimbursementStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'
}

export interface MileageReimbursementDTO {
  reimbursementId?: number;
  travelId: number;
  type: ReimbursementType;
  startLocation: string;
  endLocation: string;
  distance: number; // em quilômetros
  ratePerKm: number;
  totalAmount: number;
  vehiclePlate?: string;
  date: string;
  status: ReimbursementStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMileageReimbursementRequest {
  travelId: number;
  startLocation: string;
  endLocation: string;
  distance: number;
  ratePerKm: number;
  vehiclePlate?: string;
  date: string;
}
