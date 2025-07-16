import { useState, useEffect, useCallback } from 'react';
import { 
  ExpensePolicy, 
  CreateExpensePolicyRequest, 
  UpdateExpensePolicyRequest, 
  PolicyFilters,
  ExpenseValidation
} from '../types/expense-policy';
import { expensePolicyService } from '../service/expense-policy';

export const useExpensePolicies = () => {
  const [policies, setPolicies] = useState<ExpensePolicy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todas as políticas
   */
  const loadPolicies = useCallback(async (filters?: PolicyFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await expensePolicyService.getAllPolicies(filters);
      setPolicies(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar políticas';
      setError(errorMessage);
      console.error('❌ Erro no hook de políticas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cria uma nova política
   */
  const createPolicy = useCallback(async (policyData: CreateExpensePolicyRequest): Promise<ExpensePolicy | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Verifica conflitos antes de criar
      const conflicts = await expensePolicyService.checkPolicyConflicts(policyData);
      if (conflicts.hasConflicts) {
        const conflictMessages = conflicts.conflicts.map(c => c.description).join(', ');
        setError(`Conflitos detectados: ${conflictMessages}`);
        return null;
      }

      const newPolicy = await expensePolicyService.createPolicy(policyData);
      await loadPolicies(); // Recarrega a lista
      
      return newPolicy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar política';
      setError(errorMessage);
      console.error('❌ Erro ao criar política:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [loadPolicies]);

  /**
   * Atualiza uma política existente
   */
  const updatePolicy = useCallback(async (id: number, policyData: UpdateExpensePolicyRequest): Promise<ExpensePolicy | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedPolicy = await expensePolicyService.updatePolicy(id, policyData);
      await loadPolicies(); // Recarrega a lista
      
      return updatedPolicy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar política';
      setError(errorMessage);
      console.error('❌ Erro ao atualizar política:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [loadPolicies]);

  /**
   * Exclui uma política
   */
  const deletePolicy = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await expensePolicyService.deletePolicy(id);
      await loadPolicies(); // Recarrega a lista
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir política';
      setError(errorMessage);
      console.error('❌ Erro ao excluir política:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadPolicies]);

  /**
   * Alterna o status de uma política
   */
  const togglePolicyStatus = useCallback(async (id: number, isActive: boolean): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await expensePolicyService.togglePolicyStatus(id, isActive);
      await loadPolicies(); // Recarrega a lista
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar status da política';
      setError(errorMessage);
      console.error('❌ Erro ao alterar status:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadPolicies]);

  /**
   * Clona uma política existente
   */
  const clonePolicy = useCallback(async (originalId: number, newName: string): Promise<ExpensePolicy | null> => {
    try {
      setLoading(true);
      setError(null);
      const clonedPolicy = await expensePolicyService.clonePolicy(originalId, newName);
      await loadPolicies(); // Recarrega a lista
      
      return clonedPolicy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao clonar política';
      setError(errorMessage);
      console.error('❌ Erro ao clonar política:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [loadPolicies]);

  /**
   * Busca estatísticas das políticas
   */
  const getStatistics = useCallback(async () => {
    try {
      setError(null);
      const stats = await expensePolicyService.getPolicyStatistics();
      
      return stats;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar estatísticas';
      setError(errorMessage);
      console.error('❌ Erro ao carregar estatísticas:', err);
      return null;
    }
  }, []);

  /**
   * Busca políticas próximas do vencimento
   */
  const getPoliciesNearExpiration = useCallback(async (daysAhead: number = 30) => {
    try {
      setError(null);
      const nearExpiration = await expensePolicyService.getPoliciesNearExpiration(daysAhead);
      
      return nearExpiration;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar políticas próximas do vencimento';
      setError(errorMessage);
      console.error('❌ Erro ao buscar políticas próximas do vencimento:', err);
      return [];
    }
  }, []);

  /**
   * Sugere uma política baseada em dados de despesa
   */
  const suggestPolicy = useCallback(async (expenseData: {
    categoryId: string;
    amount: number;
    frequencyPerMonth?: number;
  }) => {
    try {
      setError(null);
      const suggestion = await expensePolicyService.suggestPolicyForExpense(expenseData);
      
      return suggestion;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar sugestão de política';
      setError(errorMessage);
      console.error('❌ Erro ao gerar sugestão:', err);
      return null;
    }
  }, []);

  /**
   * Valida uma despesa contra as políticas
   */
  const validateExpense = useCallback(async (expenseData: {
    categoryId: string;
    amount: number;
    date: string;
    paymentMethodId: string;
  }): Promise<ExpenseValidation> => {
    try {
      setError(null);
      const validation = await expensePolicyService.validateExpense(expenseData);
      
      return validation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao validar despesa';
      setError(errorMessage);
      console.error('❌ Erro ao validar despesa:', err);
      return {
        isValid: false,
        errors: [errorMessage],
        warnings: []
      };
    }
  }, []);

  // Carrega políticas iniciais
  useEffect(() => {
    loadPolicies();
  }, [loadPolicies]);

  return {
    // Estado
    policies,
    loading,
    error,
    
    // Ações básicas
    loadPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
    togglePolicyStatus,
    
    // Ações avançadas
    clonePolicy,
    validateExpense,
    suggestPolicy,
    
    // Análises e relatórios
    getStatistics,
    getPoliciesNearExpiration,
    
    // Utilitários
    clearError: () => setError(null),
    
    // Dados auxiliares
    categories: expensePolicyService.getAvailableCategories(),
    paymentMethods: expensePolicyService.getAvailablePaymentMethods()
  };
};
