import { 
  ExpensePolicy, 
  CreateExpensePolicyRequest, 
  UpdateExpensePolicyRequest,
  PolicyLimits,
  ExpenseValidation,
  PolicyFilters
} from '../types/expense-policy';
import { gedvAPI } from '../shared/gedv';
import { 
  DEFAULT_EXPENSE_CATEGORIES, 
  DEFAULT_PAYMENT_METHODS,
  DEFAULT_POLICY_LIMITS,
  POLICY_BUSINESS_RULES
} from '../constants/expense-policy';

class ExpensePolicyService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  // Cache management
  private isValidCache(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) {
      return false;
    } else {
      return (Date.now() - cached.timestamp) < this.CACHE_TTL;
    }
  }

  private getFromCache<T>(key: string): T | null {
    if (this.isValidCache(key)) {
      return this.cache.get(key)!.data as T;
    } else {
      return null;
    }
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Main CRUD operations
  async getAllPolicies(filters?: PolicyFilters): Promise<ExpensePolicy[]> {
    
    
    try {
      const cacheKey = `policies_${JSON.stringify(filters || {})}`;
      const cached = this.getFromCache<ExpensePolicy[]>(cacheKey);
      
      if (cached) {
        
        return cached;
      }

      // Mock data for development
      const mockPolicies: ExpensePolicy[] = [
        {
          id: '1',
          name: 'Política de Viagens Corporativas',
          description: 'Política para despesas relacionadas a viagens de negócios',
          category: { id: 'travel', name: 'Viagens' },
          limits: { maxAmount: 5000, maxAmountPerExpense: 1000 },
          isActive: true,
          validFrom: new Date('2024-01-01'),
          validTo: new Date('2024-12-31'),
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: { id: '1', name: 'Admin' }
        }
      ];

      
      this.setCache(cacheKey, mockPolicies);
      return mockPolicies;
    } catch (error) {
      console.error('❌ Erro ao buscar políticas:', error);
      throw error;
    }
  }

  async getPolicyById(id: string): Promise<ExpensePolicy> {
    
    
    try {
      const policies = await this.getAllPolicies();
      const policy = policies.find(p => p.id === id);
      
      if (!policy) {
        throw new Error(`Política com ID ${id} não encontrada`);
      }
      
      return policy;
    } catch (error) {
      console.error('❌ Erro ao buscar política por ID:', error);
      throw error;
    }
  }

  async createPolicy(data: CreateExpensePolicyRequest): Promise<ExpensePolicy> {
    
    
    try {
      const newPolicy: ExpensePolicy = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        category: DEFAULT_EXPENSE_CATEGORIES.find(c => c.id === data.categoryId)!,
        limits: data.limits || DEFAULT_POLICY_LIMITS,
        isActive: data.isActive ?? true,
        validFrom: data.validFrom,
        validTo: data.validTo,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: { id: '1', name: 'Current User' }
      };

      
      return newPolicy;
    } catch (error) {
      console.error('❌ Erro ao criar política:', error);
      throw error;
    }
  }

  async updatePolicy(id: string, data: UpdateExpensePolicyRequest): Promise<ExpensePolicy> {
    
    
    try {
      const existingPolicy = await this.getPolicyById(id);
      
      const updatedPolicy: ExpensePolicy = {
        ...existingPolicy,
        ...data,
        id,
        updatedAt: new Date()
      };

      
      return updatedPolicy;
    } catch (error) {
      console.error('❌ Erro ao atualizar política:', error);
      throw error;
    }
  }

  async deletePolicy(id: string): Promise<void> {
    
    
    try {
      await this.getPolicyById(id); // Verifica se existe
      
    } catch (error) {
      console.error('❌ Erro ao excluir política:', error);
      throw error;
    }
  }

  // Helper methods
  getAvailableCategories() {
    return DEFAULT_EXPENSE_CATEGORIES;
  }

  getAvailablePaymentMethods() {
    return DEFAULT_PAYMENT_METHODS;
  }

  // Additional methods (simplified versions)
  async togglePolicyStatus(id: string, isActive: boolean): Promise<ExpensePolicy> {
    return this.updatePolicy(id, { isActive });
  }

  async clonePolicy(originalId: string, newName: string): Promise<ExpensePolicy> {
    const original = await this.getPolicyById(originalId);
    return this.createPolicy({
      name: newName,
      description: `Cópia de: ${original.description}`,
      categoryId: original.category.id,
      limits: original.limits,
      isActive: false,
      validFrom: new Date(),
      validTo: original.validTo
    });
  }

  async getPolicyStatistics() {
    return {
      total: 5,
      active: 3,
      inactive: 2,
      expiringSoon: 1
    };
  }

  async checkPolicyConflicts(policyData: CreateExpensePolicyRequest) {
    return {
      hasConflicts: false,
      conflicts: []
    };
  }

  async getPoliciesNearExpiration(daysAhead: number = 30) {
    return [];
  }

  async suggestPolicyForExpense(expenseData: any) {
    return null;
  }

  async validateExpense(expenseData: any): Promise<ExpenseValidation> {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
}

export const expensePolicyService = new ExpensePolicyService();
export { ExpensePolicyService };
