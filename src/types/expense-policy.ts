// Interfaces para categorias de despesas
export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

// Interfaces para métodos de pagamento
export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

// Interface principal da política de despesas
export interface ExpensePolicy {
  id: number;
  name: string;
  description?: string;
  category: ExpenseCategory;
  maxAmount: number;
  maxDailyAmount?: number;
  maxMonthlyAmount?: number;
  requiresReceipt: boolean;
  requiresJustification: boolean;
  allowedPaymentMethods: PaymentMethod[];
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  tags?: string[];
}

// Interfaces para requests
export interface CreateExpensePolicyRequest {
  name: string;
  description?: string;
  categoryId: string;
  maxAmount: number;
  maxDailyAmount?: number;
  maxMonthlyAmount?: number;
  requiresReceipt: boolean;
  requiresJustification: boolean;
  allowedPaymentMethodIds: string[];
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  tags?: string[];
}

export interface UpdateExpensePolicyRequest {
  name?: string;
  description?: string;
  categoryId?: string;
  maxAmount?: number;
  maxDailyAmount?: number;
  maxMonthlyAmount?: number;
  requiresReceipt?: boolean;
  requiresJustification?: boolean;
  allowedPaymentMethodIds?: string[];
  isActive?: boolean;
  validFrom?: string;
  validUntil?: string;
  tags?: string[];
}

// Interface para limites de políticas
export interface PolicyLimits {
  policyId: number;
  maxAmount: number;
  maxDailyAmount?: number;
  maxMonthlyAmount?: number;
  isActive: boolean;
  currentUsage?: {
    dailyUsed: number;
    monthlyUsed: number;
    totalUsed: number;
  };
}

// Interface para validação de despesas
export interface ExpenseValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestedPolicy?: ExpensePolicy;
}

// Enum para status de políticas
export enum PolicyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  EXPIRED = 'expired'
}

// Tipos de filtros para busca
export interface PolicyFilters {
  category?: string;
  isActive?: boolean;
  maxAmount?: { min?: number; max?: number };
  tags?: string[];
  validDate?: string;
}
