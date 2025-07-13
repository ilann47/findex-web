import { gedvAPI } from '@/shared/gedv';
import { 
  ExpenseDTO, 
  CreateExpenseRequest,
  AdvanceRequestDTO,
  CreateAdvanceRequest,
  MileageReimbursementDTO,
  CreateMileageReimbursementRequest
} from '@/types/expense';

class ExpenseService {
  // Expense management
  async getExpensesByTravelId(travelId: number): Promise<ExpenseDTO[]> {
    try {
      const response = await gedvAPI.get(`/travels/${travelId}/expenses`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar despesas:', error);
      throw error;
    }
  }

  async createExpense(expenseData: CreateExpenseRequest): Promise<ExpenseDTO> {
    try {
      const formData = new FormData();
      
      // Append basic expense data
      Object.keys(expenseData).forEach(key => {
        if (key !== 'attachments') {
          formData.append(key, (expenseData as any)[key]);
        }
      });

      // Append files if any
      if (expenseData.attachments) {
        expenseData.attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
      }

      const response = await gedvAPI.post('/expenses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar despesa:', error);
      throw error;
    }
  }

  async updateExpense(expenseId: number, expenseData: Partial<ExpenseDTO>): Promise<ExpenseDTO> {
    try {
      const response = await gedvAPI.put(`/expenses/${expenseId}`, expenseData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar despesa:', error);
      throw error;
    }
  }

  async deleteExpense(expenseId: number): Promise<void> {
    try {
      await gedvAPI.delete(`/expenses/${expenseId}`);
    } catch (error) {
      console.error('❌ Erro ao excluir despesa:', error);
      throw error;
    }
  }

  // Advance request management
  async getAdvanceRequestsByTravelId(travelId: number): Promise<AdvanceRequestDTO[]> {
    try {
      const response = await gedvAPI.get(`/travels/${travelId}/advances`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar adiantamentos:', error);
      throw error;
    }
  }

  async createAdvanceRequest(advanceData: CreateAdvanceRequest): Promise<AdvanceRequestDTO> {
    try {
      const response = await gedvAPI.post('/advance-requests', advanceData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar adiantamento:', error);
      throw error;
    }
  }

  async updateAdvanceRequest(advanceId: number, advanceData: Partial<AdvanceRequestDTO>): Promise<AdvanceRequestDTO> {
    try {
      const response = await gedvAPI.put(`/advance-requests/${advanceId}`, advanceData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar adiantamento:', error);
      throw error;
    }
  }

  // Mileage reimbursement management
  async getMileageReimbursementsByTravelId(travelId: number): Promise<MileageReimbursementDTO[]> {
    try {
      const response = await gedvAPI.get(`/travels/${travelId}/mileage-reimbursements`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar reembolsos por km:', error);
      throw error;
    }
  }

  async createMileageReimbursement(reimbursementData: CreateMileageReimbursementRequest): Promise<MileageReimbursementDTO> {
    try {
      // Calculate total amount
      const totalAmount = reimbursementData.distance * reimbursementData.ratePerKm;
      
      const response = await gedvAPI.post('/mileage-reimbursements', {
        ...reimbursementData,
        totalAmount,
        type: 'MILEAGE'
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar reembolso por km:', error);
      throw error;
    }
  }

  async updateMileageReimbursement(reimbursementId: number, reimbursementData: Partial<MileageReimbursementDTO>): Promise<MileageReimbursementDTO> {
    try {
      const response = await gedvAPI.put(`/mileage-reimbursements/${reimbursementId}`, reimbursementData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar reembolso por km:', error);
      throw error;
    }
  }

  async deleteMileageReimbursement(reimbursementId: number): Promise<void> {
    try {
      await gedvAPI.delete(`/mileage-reimbursements/${reimbursementId}`);
    } catch (error) {
      console.error('❌ Erro ao excluir reembolso por km:', error);
      throw error;
    }
  }

  // Utility methods
  async getTravelSummary(travelId: number): Promise<{
    totalExpenses: number;
    totalAdvances: number;
    totalReimbursements: number;
    balance: number;
  }> {
    try {
      const response = await gedvAPI.get(`/travels/${travelId}/summary`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar resumo da viagem:', error);
      throw error;
    }
  }
}

export const expenseService = new ExpenseService();
