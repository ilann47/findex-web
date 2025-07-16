import { 
  ExpensePolicy, 
  CreateExpensePolicyRequest, 
  UpdateExpensePolicyRequest,
  PolicyFilters,
  ExpenseValidation,
  ExpenseCategory,
  PaymentMethod
} from '../types/expense-policy';

// Mock data para desenvolvimento
const mockCategories: ExpenseCategory[] = [
  { id: 'travel', name: 'Viagens', description: 'Despesas de viagem' },
  { id: 'meals', name: 'Alimentação', description: 'Refeições e alimentação' },
  { id: 'transport', name: 'Transporte', description: 'Transporte e combustível' }
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Cartão Corporativo' },
  { id: 'cash', name: 'Dinheiro' },
  { id: 'transfer', name: 'Transferência' }
];

class ExpensePolicyService {
  private mockPolicies: ExpensePolicy[] = [
    {
      id: 1,
      name: 'Política de Viagens Corporativas',
      description: 'Política para despesas de viagem',
      category: mockCategories[0],
      maxAmount: 5000,
      maxDailyAmount: 500,
      maxMonthlyAmount: 15000,
      requiresReceipt: true,
      requiresJustification: true,
      allowedPaymentMethods: [mockPaymentMethods[0], mockPaymentMethods[1]],
      isActive: true,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      createdBy: 'Admin',
      tags: ['viagem', 'corporativo']
    },
    {
      id: 2,
      name: 'Política de Alimentação',
      description: 'Política para despesas de alimentação',
      category: mockCategories[1],
      maxAmount: 100,
      maxDailyAmount: 50,
      maxMonthlyAmount: 1500,
      requiresReceipt: true,
      requiresJustification: false,
      allowedPaymentMethods: [mockPaymentMethods[0], mockPaymentMethods[1]],
      isActive: true,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      createdBy: 'Admin',
      tags: ['alimentacao']
    }
  ];

  async getAllPolicies(filters?: PolicyFilters): Promise<ExpensePolicy[]> {
    
    
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let policies = [...this.mockPolicies];
    
    if (filters) {
      if (filters.category) {
        policies = policies.filter(p => p.category.id === filters.category);
      }
      if (filters.isActive !== undefined) {
        policies = policies.filter(p => p.isActive === filters.isActive);
      }
    }
    
    
    return policies;
  }

  async getPolicyById(id: number): Promise<ExpensePolicy> {
    
    
    const policy = this.mockPolicies.find(p => p.id === id);
    if (!policy) {
      throw new Error(`Política com ID ${id} não encontrada`);
    }
    
    return policy;
  }

  async createPolicy(data: CreateExpensePolicyRequest): Promise<ExpensePolicy> {
    
    
    const category = mockCategories.find(c => c.id === data.categoryId);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    const allowedPaymentMethods = mockPaymentMethods.filter(pm => 
      data.allowedPaymentMethodIds.includes(pm.id)
    );

    const newPolicy: ExpensePolicy = {
      id: Math.max(...this.mockPolicies.map(p => p.id)) + 1,
      name: data.name,
      description: data.description || '',
      category,
      maxAmount: data.maxAmount,
      maxDailyAmount: data.maxDailyAmount,
      maxMonthlyAmount: data.maxMonthlyAmount,
      requiresReceipt: data.requiresReceipt,
      requiresJustification: data.requiresJustification,
      allowedPaymentMethods,
      isActive: data.isActive,
      validFrom: data.validFrom,
      validUntil: data.validUntil,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      tags: data.tags || []
    };

    this.mockPolicies.push(newPolicy);
    
    return newPolicy;
  }

  async updatePolicy(id: number, data: UpdateExpensePolicyRequest): Promise<ExpensePolicy> {
    
    
    const index = this.mockPolicies.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Política com ID ${id} não encontrada`);
    }

    const existingPolicy = this.mockPolicies[index];
    
    // Atualiza categoria se fornecida
    let category = existingPolicy.category;
    if (data.categoryId) {
      const foundCategory = mockCategories.find(c => c.id === data.categoryId);
      if (foundCategory) category = foundCategory;
    }

    // Atualiza métodos de pagamento se fornecidos
    let allowedPaymentMethods = existingPolicy.allowedPaymentMethods;
    if (data.allowedPaymentMethodIds) {
      allowedPaymentMethods = mockPaymentMethods.filter(pm => 
        data.allowedPaymentMethodIds!.includes(pm.id)
      );
    }

    const updatedPolicy: ExpensePolicy = {
      ...existingPolicy,
      ...data,
      id,
      category,
      allowedPaymentMethods,
      updatedAt: new Date().toISOString()
    };

    this.mockPolicies[index] = updatedPolicy;
    
    return updatedPolicy;
  }

  async deletePolicy(id: number): Promise<void> {
    
    
    const index = this.mockPolicies.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Política com ID ${id} não encontrada`);
    }

    this.mockPolicies.splice(index, 1);
    
  }

  async togglePolicyStatus(id: number, isActive: boolean): Promise<ExpensePolicy> {
    return this.updatePolicy(id, { isActive });
  }

  async clonePolicy(originalId: number, newName: string): Promise<ExpensePolicy> {
    const original = await this.getPolicyById(originalId);
    
    const cloneData: CreateExpensePolicyRequest = {
      name: newName,
      description: `Cópia de: ${original.description}`,
      categoryId: original.category.id,
      maxAmount: original.maxAmount,
      maxDailyAmount: original.maxDailyAmount,
      maxMonthlyAmount: original.maxMonthlyAmount,
      requiresReceipt: original.requiresReceipt,
      requiresJustification: original.requiresJustification,
      allowedPaymentMethodIds: original.allowedPaymentMethods.map(pm => pm.id),
      isActive: false,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: original.validUntil,
      tags: original.tags
    };

    return this.createPolicy(cloneData);
  }

  async getPolicyStatistics() {
    const total = this.mockPolicies.length;
    const active = this.mockPolicies.filter(p => p.isActive).length;
    const inactive = total - active;
    
    return {
      total,
      active,
      inactive,
      expiringSoon: 0
    };
  }

  async checkPolicyConflicts(policyData: CreateExpensePolicyRequest) {
    
    
    // Verifica se já existe política ativa para a mesma categoria
    const existingActivePolicy = this.mockPolicies.find(p => 
      p.category.id === policyData.categoryId && p.isActive
    );

    if (existingActivePolicy) {
      return {
        hasConflicts: true,
        conflicts: [{
          policyId: existingActivePolicy.id,
          policyName: existingActivePolicy.name,
          conflictType: 'duplicate_category',
          description: `Já existe uma política ativa para a categoria "${existingActivePolicy.category.name}"`
        }]
      };
    }

    return {
      hasConflicts: false,
      conflicts: []
    };
  }

  async getPoliciesNearExpiration(daysAhead: number = 30) {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
    
    return this.mockPolicies.filter(policy => {
      if (!policy.validUntil) return false;
      const validUntil = new Date(policy.validUntil);
      return validUntil <= futureDate && validUntil >= today;
    });
  }

  async suggestPolicyForExpense(expenseData: any) {
    if (!expenseData.categoryId) return null;
    
    const matchingPolicy = this.mockPolicies.find(p => 
      p.category.id === expenseData.categoryId && 
      p.isActive &&
      p.maxAmount >= expenseData.amount
    );
    
    return matchingPolicy || null;
  }

  async validateExpense(expenseData: any): Promise<ExpenseValidation> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!expenseData.amount || expenseData.amount <= 0) {
      errors.push('Valor da despesa deve ser maior que zero');
    }
    
    if (!expenseData.categoryId) {
      errors.push('Categoria é obrigatória');
    }
    
    // Busca política aplicável
    const applicablePolicy = await this.suggestPolicyForExpense(expenseData);
    
    if (applicablePolicy) {
      if (expenseData.amount > applicablePolicy.maxAmount) {
        errors.push(`Valor excede o limite da política: R$ ${applicablePolicy.maxAmount}`);
      }
      
      if (applicablePolicy.requiresReceipt && !expenseData.hasReceipt) {
        warnings.push('Esta despesa requer comprovante');
      }
      
      if (applicablePolicy.requiresJustification && !expenseData.justification) {
        warnings.push('Esta despesa requer justificativa');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestedPolicy: applicablePolicy || undefined
    };
  }

  // Métodos auxiliares
  getAvailableCategories() {
    return mockCategories;
  }

  getAvailablePaymentMethods() {
    return mockPaymentMethods;
  }
}

// Criar e exportar instância do serviço
const expensePolicyService = new ExpensePolicyService();

export default expensePolicyService;
export { expensePolicyService, ExpensePolicyService };
