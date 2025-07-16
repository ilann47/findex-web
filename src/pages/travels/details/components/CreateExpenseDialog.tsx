import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Alert
} from '@mui/material';
import { ExpenseType, CreateExpenseRequest } from '@/types/expense';
import { expenseService } from '@/service/expense';

interface CreateExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  travelId: number;
  onSuccess: () => void;
}

export const CreateExpenseDialog: React.FC<CreateExpenseDialogProps> = ({
  open,
  onClose,
  travelId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateExpenseRequest>({
    travelId,
    type: ExpenseType.OTHER,
    description: '',
    amount: 0,
    currency: 'PYG',
    date: new Date().toISOString().split('T')[0],
  });

  const expenseTypes = [
    { value: ExpenseType.ACCOMMODATION, label: 'Hospedagem' },
    { value: ExpenseType.MEALS, label: 'Alimentação' },
    { value: ExpenseType.TRANSPORT, label: 'Transporte' },
    { value: ExpenseType.FUEL, label: 'Combustível' },
    { value: ExpenseType.PARKING, label: 'Estacionamento' },
    { value: ExpenseType.OTHER, label: 'Outros' },
  ];

  const handleInputChange = (field: keyof CreateExpenseRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'amount' ? parseFloat(event.target.value) || 0 : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await expenseService.createExpense(formData);
      
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        travelId,
        type: ExpenseType.OTHER,
        description: '',
        amount: 0,
        currency: 'PYG',
        date: new Date().toISOString().split('T')[0],
      });

    } catch (error) {
      console.error('❌ Erro ao criar despesa:', error);
      setError('Erro ao criar despesa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Nova Despesa</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Tipo de Despesa"
              value={formData.type}
              onChange={handleInputChange('type')}
              disabled={loading}
            >
              {expenseTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange('description')}
              disabled={loading}
              placeholder="Descreva a despesa..."
            />
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Valor"
              type="number"
              value={formData.amount}
              onChange={handleInputChange('amount')}
              disabled={loading}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Moeda"
              value={formData.currency}
              onChange={handleInputChange('currency')}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !formData.description || formData.amount <= 0}
        >
          {loading ? 'Criando...' : 'Criar Despesa'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
