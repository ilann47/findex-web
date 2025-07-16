import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert
} from '@mui/material';
import { CreateAdvanceRequest } from '@/types/expense';
import { expenseService } from '@/service/expense';

interface CreateAdvanceDialogProps {
  open: boolean;
  onClose: () => void;
  travelId: number;
  onSuccess: () => void;
}

export const CreateAdvanceDialog: React.FC<CreateAdvanceDialogProps> = ({
  open,
  onClose,
  travelId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateAdvanceRequest>({
    travelId,
    amount: 0,
    currency: 'PYG',
    justification: '',
  });

  const handleInputChange = (field: keyof CreateAdvanceRequest) => (
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

      await expenseService.createAdvanceRequest(formData);
      
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        travelId,
        amount: 0,
        currency: 'PYG',
        justification: '',
      });

    } catch (error) {
      console.error('❌ Erro ao criar adiantamento:', error);
      setError('Erro ao criar solicitação de adiantamento. Tente novamente.');
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
      <DialogTitle>Solicitar Adiantamento</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Valor do Adiantamento"
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
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Justificativa"
              multiline
              rows={4}
              value={formData.justification}
              onChange={handleInputChange('justification')}
              disabled={loading}
              placeholder="Explique por que precisa deste adiantamento..."
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
          disabled={loading || !formData.justification || formData.amount <= 0}
        >
          {loading ? 'Solicitando...' : 'Solicitar Adiantamento'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
