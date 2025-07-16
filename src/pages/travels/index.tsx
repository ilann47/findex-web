import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Paper,
  Box,
  Typography
} from '@mui/material';
import { Add as AddIcon, Info as InfoIcon } from '@mui/icons-material';
import { TravelDTO, CreateTravelRequest, TravelStatus } from '@/types/travel';
import { ProtectedComponent } from '@/layouts/protected/component';
import { ViewLayout } from '@/layouts/view';
import { travelService } from '@/service/travels';
import { TravelFiltersComponent, TravelFilters, defaultFilters } from '@/components/travels/TravelFilters';
import { filterTravels } from '@/utils/travel-filters';
import { useAuth } from '@/hooks/auth';

// Funções para mapear status antigos para novos
const mapOldStatusToNew = (status: string): string => {
  const statusMapping: Record<string, string> = {
    'APPROVED': 'ATIVO',
    'PENDING': 'INATIVO', 
    'CANCELLED': 'CANCELADO',
    'COMPLETED': 'CONCLUIDO',
    'REJECTED': 'CANCELADO'
  };
  
  return statusMapping[status] || status;
};

const getStatusLabel = (status: string): string => {
  const mappedStatus = mapOldStatusToNew(status);
  const labels: Record<string, string> = {
    'ATIVO': 'Ativo',
    'INATIVO': 'Inativo',
    'CANCELADO': 'Cancelado',
    'CONCLUIDO': 'Concluído'
  };
  
  return labels[mappedStatus] || mappedStatus;
};

const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'info' => {
  const mappedStatus = mapOldStatusToNew(status);
  const colors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    'ATIVO': 'success',
    'INATIVO': 'warning',
    'CANCELADO': 'error',
    'CONCLUIDO': 'info'
  };
  
  return colors[mappedStatus] || 'info';
};

const TravelsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [travels, setTravels] = useState<TravelDTO[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TravelFilters>(defaultFilters);
  const [formData, setFormData] = useState<CreateTravelRequest>({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    purpose: ''
  });

  // Filtrar viagens baseado nos filtros ativos
  const filteredTravels = useMemo(() => {
    return filterTravels(travels, filters);
  }, [travels, filters]);

  // Callback para alteração de filtros
  const handleFiltersChange = (newFilters: TravelFilters) => {
    setFilters(newFilters);
  };

  // Callback para limpar filtros
  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    loadTravels();
  }, []);

  const loadTravels = async () => {
    try {
      setLoading(true);
      
      try {
        const travelsData = await travelService.getAllTravels();
        const safeTravels = Array.isArray(travelsData) ? travelsData : [];
        
        if (safeTravels.length > 0) {
          
          
        }
        setTravels(safeTravels);
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
      const travelData: CreateTravelRequest = {
        ...formData,
        userId: user?.homeAccountId || user?.id,
        status: TravelStatus.ATIVO // Status padrão para novas viagens
      };
      
      
      
      const newTravel = await travelService.createTravel(travelData);
      
      setTravels(prev => [...prev, newTravel]);
      setOpenDialog(false);
      setFormData({
        origin: '',
        destination: '',
        startDate: '',
        endDate: '',
        purpose: ''
      });
      
      
    } catch (error: any) {
      console.error('❌ Erro ao criar viagem:', error);
      console.error('🔍 Detalhes do erro:', error.response?.data);
      console.error('📊 Status do erro:', error.response?.status);
    }
  };

  const getStatusLabel = (status: TravelStatus) => {
    const statusStr = status as string;
    
    // Mapeamento de status antigos para novos
    const statusMapping: Record<string, string> = {
      'APPROVED': 'Ativa',
      'PENDING': 'Inativa',
      'CANCELLED': 'Cancelada', 
      'COMPLETED': 'Concluída',
      'REJECTED': 'Cancelada',
      'ATIVO': 'Ativa',
      'INATIVO': 'Inativa',
      'CANCELADO': 'Cancelada',
      'CONCLUIDO': 'Concluída'
    };
    
    return statusMapping[statusStr] || statusStr;
  };

  const getStatusColor = (status: TravelStatus) => {
    const statusStr = status as string;
    
    // Mapeia status antigos para cores apropriadas
    const colorMapping: Record<string, any> = {
      'APPROVED': 'success',
      'PENDING': 'warning',
      'CANCELLED': 'error',
      'COMPLETED': 'info',
      'REJECTED': 'error',
      'ATIVO': 'success',
      'INATIVO': 'warning',
      'CANCELADO': 'error',
      'CONCLUIDO': 'info'
    };
    
    return colorMapping[statusStr] || 'default';
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
        {/* Filtros */}
        <TravelFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          totalCount={travels.length}
          filteredCount={filteredTravels.length}
        />

        {/* Travels Table */}
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'grey.50' }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
              <InfoIcon fontSize="small" />
              💡 Clique em qualquer linha da tabela para ver os detalhes completos da viagem
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
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
                    <TableCell colSpan={6} align="center">
                      Carregando viagens...
                    </TableCell>
                  </TableRow>
                ) : filteredTravels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      {travels.length === 0 
                        ? "Nenhuma viagem encontrada. Clique em 'Nova Viagem' para começar."
                        : "Nenhuma viagem corresponde aos filtros aplicados."
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  (Array.isArray(filteredTravels) ? filteredTravels : []).map((travel, index) => {
                    const handleTravelClick = () => {
                      // Tenta usar travelId, depois id, depois índice como fallback
                      const id = travel.travelId || travel.id || index + 1;
                      
                      
                      navigate(`/travels/${id}`);
                    };

                    return (
                      <TableRow 
                        key={travel.travelId || travel.id || `travel-${index}`}
                        onClick={handleTravelClick}
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            transform: 'scale(1.01)',
                            boxShadow: 1,
                          },
                          transition: 'all 0.2s ease-in-out',
                          '&:active': {
                            transform: 'scale(0.99)',
                          }
                        }}
                      >
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
                    );
                  })
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
              disabled={!formData.origin || !formData.destination || !formData.startDate || !formData.endDate || !formData.purpose}
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
