import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  Typography,
  Box
} from '@mui/material';
import { CreateMileageReimbursementRequest } from '@/types/expense';
import { expenseService } from '@/service/expense';

interface CreateMileageDialogProps {
  open: boolean;
  onClose: () => void;
  travelId: number;
  onSuccess: () => void;
}

export const CreateMileageDialog: React.FC<CreateMileageDialogProps> = ({
  open,
  onClose,
  travelId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateMileageReimbursementRequest>({
    travelId,
    startLocation: '',
    endLocation: '',
    distance: 0,
    ratePerKm: 1500, // Valor padrão em PYG
    vehiclePlate: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (field: keyof CreateMileageReimbursementRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (field === 'distance' || field === 'ratePerKm') 
      ? parseFloat(event.target.value) || 0 
      : event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    return formData.distance * formData.ratePerKm;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
    }).format(amount);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await expenseService.createMileageReimbursement(formData);
      
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        travelId,
        startLocation: '',
        endLocation: '',
        distance: 0,
        ratePerKm: 1500,
        vehiclePlate: '',
        date: new Date().toISOString().split('T')[0],
      });

    } catch (error) {
      console.error('❌ Erro ao criar reembolso por km:', error);
      setError('Erro ao criar solicitação de reembolso. Tente novamente.');
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
      <DialogTitle>Solicitar Reembolso por Quilometragem</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Local de Partida"
              value={formData.startLocation}
              onChange={handleInputChange('startLocation')}
              disabled={loading}
              placeholder="Ex: Cidade del Este"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Local de Destino"
              value={formData.endLocation}
              onChange={handleInputChange('endLocation')}
              disabled={loading}
              placeholder="Ex: Asunción"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Distância (km)"
              type="number"
              value={formData.distance}
              onChange={handleInputChange('distance')}
              disabled={loading}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Valor por km (PYG)"
              type="number"
              value={formData.ratePerKm}
              onChange={handleInputChange('ratePerKm')}
              disabled={loading}
              inputProps={{ min: 0, step: 1 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Placa do Veículo"
              value={formData.vehiclePlate}
              onChange={handleInputChange('vehiclePlate')}
              disabled={loading}
              placeholder="Ex: ABC-1234"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data da Viagem"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          {formData.distance > 0 && formData.ratePerKm > 0 && (
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" color="primary">
                  Total do Reembolso: {formatCurrency(calculateTotal())}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.distance} km × {formatCurrency(formData.ratePerKm)}/km
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !formData.startLocation || !formData.endLocation || formData.distance <= 0}
        >
          {loading ? 'Solicitando...' : 'Solicitar Reembolso'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
