import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Grid, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TravelDTO, CreateTravelRequest, TravelStatus } from '@/types/travel';
import { ProtectedComponent } from '@/layouts/protected/component';
import { ViewLayout } from '@/layouts/view';
import { travelService } from '@/service/travels';

const TravelsPage: React.FC = () => {
  const [travels, setTravels] = useState<TravelDTO[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTravelRequest>({
    userId: '',
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    purpose: ''
  });

  useEffect(() => {
    loadTravels();
  }, []);

  const loadTravels = async () => {
    try {
      setLoading(true);
      
      try {
        const travelsData = await travelService.getAllTravels();
        setTravels(travelsData);
      } catch (error) {
        console.error('❌ Erro ao carregar viagens:', error);
        setTravels([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateTravelRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const newTravel = await travelService.createTravel(formData);
      
      setTravels(prev => [...prev, newTravel]);
      setOpenDialog(false);
      setFormData({
        userId: '',
        origin: '',
        destination: '',
        startDate: '',
        endDate: '',
        purpose: ''
      });
    } catch (error) {
      console.error('❌ Erro ao criar viagem:', error);
    }
  };

  const getStatusColor = (status: TravelStatus) => {
    switch (status) {
      case TravelStatus.PENDING:
        return 'warning';
      case TravelStatus.APPROVED:
        return 'success';
      case TravelStatus.REJECTED:
        return 'error';
      case TravelStatus.COMPLETED:
        return 'info';
      case TravelStatus.CANCELLED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: TravelStatus) => {
    switch (status) {
      case TravelStatus.PENDING:
        return 'Pendente';
      case TravelStatus.APPROVED:
        return 'Aprovada';
      case TravelStatus.REJECTED:
        return 'Rejeitada';
      case TravelStatus.COMPLETED:
        return 'Concluída';
      case TravelStatus.CANCELLED:
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <ViewLayout.Root>
      <ViewLayout.Header.Root>
        <ViewLayout.Header.Title>
          Gerenciar Viagens
        </ViewLayout.Header.Title>
        
        <ViewLayout.Header.RightElements>
          <ProtectedComponent role={['TRAVEL_CREATE']}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Nova Viagem
            </Button>
          </ProtectedComponent>
        </ViewLayout.Header.RightElements>
      </ViewLayout.Header.Root>

      <ViewLayout.Content>
        {/* Travels Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Usuário</TableCell>
                  <TableCell>Origem</TableCell>
                  <TableCell>Destino</TableCell>
                  <TableCell>Data Início</TableCell>
                  <TableCell>Data Fim</TableCell>
                  <TableCell>Propósito</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Carregando viagens...
                    </TableCell>
                  </TableRow>
                ) : travels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Nenhuma viagem encontrada. Clique em "Nova Viagem" para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  travels.map((travel) => (
                    <TableRow key={travel.travelId}>
                      <TableCell>{travel.travelId}</TableCell>
                      <TableCell>{travel.userId}</TableCell>
                      <TableCell>{travel.origin}</TableCell>
                      <TableCell>{travel.destination}</TableCell>
                      <TableCell>{new Date(travel.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(travel.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{travel.purpose}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(travel.status)}
                          color={getStatusColor(travel.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Create Travel Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Nova Viagem</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ID do Usuário"
                  value={formData.userId}
                  onChange={handleInputChange('userId')}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Origem"
                  value={formData.origin}
                  onChange={handleInputChange('origin')}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destino"
                  value={formData.destination}
                  onChange={handleInputChange('destination')}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Início"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange('startDate')}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Fim"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange('endDate')}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Propósito da Viagem"
                  value={formData.purpose}
                  onChange={handleInputChange('purpose')}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!formData.userId || !formData.origin || !formData.destination || !formData.startDate || !formData.endDate || !formData.purpose}
            >
              Criar Viagem
            </Button>
          </DialogActions>
        </Dialog>
      </ViewLayout.Content>
    </ViewLayout.Root>
  );
};

export default TravelsPage;
