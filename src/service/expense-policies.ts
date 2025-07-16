import { ExpensePolicy, CreateExpensePolicyRequest } from '../types/expense-policy';

class ExpensePolicyService {
  private mockPolicies: ExpensePolicy[] = [
    {
      id: 1,
      name: 'Política de Alimentação',
      description: 'Limites para despesas com alimentação durante viagens',
      maxAmount: 100.00,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Política de Transporte',
      description: 'Limites para despesas com transporte e combustível',
      maxAmount: 200.00,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Política de Hospedagem',
      description: 'Limites para despesas com hospedagem e acomodação',
      maxAmount: 300.00,
      isActive: false,
      createdAt: new Date().toISOString()
    }
  ];

  async getAllPolicies(): Promise<ExpensePolicy[]> {
    // Simular chamada de API com delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockPolicies];
  }

  async getPolicyById(id: number): Promise<ExpensePolicy | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockPolicies.find(policy => policy.id === id) || null;
  }

  async createPolicy(data: CreateExpensePolicyRequest): Promise<ExpensePolicy> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPolicy: ExpensePolicy = {
      id: Math.max(...this.mockPolicies.map(p => p.id)) + 1,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    this.mockPolicies.push(newPolicy);
    return newPolicy;
  }

  async updatePolicy(id: number, data: Partial<CreateExpensePolicyRequest>): Promise<ExpensePolicy> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.mockPolicies.findIndex(policy => policy.id === id);
    if (index === -1) {
      throw new Error('Política não encontrada');
    }
    
    this.mockPolicies[index] = {
      ...this.mockPolicies[index],
      ...data
    };
    
    return this.mockPolicies[index];
  }

  async deletePolicy(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.mockPolicies.findIndex(policy => policy.id === id);
    if (index === -1) {
      throw new Error('Política não encontrada');
    }
    
    this.mockPolicies.splice(index, 1);
  }

  async togglePolicyStatus(id: number): Promise<ExpensePolicy> {
    const policy = await this.getPolicyById(id);
    if (!policy) {
      throw new Error('Política não encontrada');
    }
    
    return this.updatePolicy(id, { isActive: !policy.isActive });
  }
}

export const expensePolicyService = new ExpensePolicyService();
