import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Chip,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';
import { ExpenseDTO, AdvanceRequestDTO, MileageReimbursementDTO } from '@/types/expense';
import { expenseService } from '@/service/expense';
import { ProtectedComponent } from '@/layouts/protected/component';
import { ViewLayout } from '@/layouts/view';
import { TravelAccessGuard } from '@/components/travels/TravelAccessGuard';
import { useTravel } from '@/contexts/travel-context';
import { ExpensesList } from './components/ExpensesList';
import { AdvanceRequestsList } from './components/AdvanceRequestsList';
import { MileageReimbursementsList } from './components/MileageReimbursementsList';
import { CreateExpenseDialog } from './components/CreateExpenseDialog';
import { CreateAdvanceDialog } from './components/CreateAdvanceDialog';
import { CreateMileageDialog } from './components/CreateMileageDialog';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`travel-tabpanel-${index}`}
      aria-labelledby={`travel-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TravelDetailsPage: React.FC = () => {
  const { travelId } = useParams<{ travelId: string }>();
  const navigate = useNavigate();

  const travelIdNum = travelId ? parseInt(travelId) : 0;

  // Verificação inicial de ID válido
  if (!travelId || isNaN(travelIdNum)) {
    return (
      <ViewLayout.Root>
        <ViewLayout.Content>
          <Alert severity="error">
            ID da viagem inválido
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/travels')}
            sx={{ mt: 2 }}
          >
            Voltar para Viagens
          </Button>
        </ViewLayout.Content>
      </ViewLayout.Root>
    );
  }

  return (
    <ProtectedComponent role="TRAVEL_LIST">
      <ViewLayout.Root>
        <ViewLayout.Content>
          <TravelAccessGuard travelId={travelIdNum}>
            <TravelDetailsContent />
          </TravelAccessGuard>
        </ViewLayout.Content>
      </ViewLayout.Root>
    </ProtectedComponent>
  );
};

const TravelDetailsContent: React.FC = () => {
  const navigate = useNavigate();
  const { travel } = useTravel();
  
  const [expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [advances, setAdvances] = useState<AdvanceRequestDTO[]>([]);
  const [reimbursements, setReimbursements] = useState<MileageReimbursementDTO[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [summary, setSummary] = useState<{
    totalExpenses: number;
    totalAdvances: number;
    totalReimbursements: number;
    balance: number;
  } | null>(null);

  // Dialog states
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [openAdvanceDialog, setOpenAdvanceDialog] = useState(false);
  const [openMileageDialog, setOpenMileageDialog] = useState(false);

  useEffect(() => {
    if (travel?.id) {
      loadExpenseData(travel.id);
    }
  }, [travel]);

  const loadExpenseData = async (travelId: number) => {
    try {
      // Load expense data
      const [expensesData, advancesData, reimbursementsData] = await Promise.all([
        expenseService.getExpensesByTravelId(travelId),
        expenseService.getAdvanceRequestsByTravelId(travelId),
        expenseService.getMileageReimbursementsByTravelId(travelId)
      ]);

      setExpenses(expensesData);
      setAdvances(advancesData);
      setReimbursements(reimbursementsData);

      // Calculate summary
      const totalExpenses = expensesData.reduce((sum: number, exp: ExpenseDTO) => sum + exp.amount, 0);
      const totalAdvances = advancesData.reduce((sum: number, adv: AdvanceRequestDTO) => sum + adv.amount, 0);
      const totalReimbursements = reimbursementsData.reduce((sum: number, reimb: MileageReimbursementDTO) => sum + reimb.totalAmount, 0);
      
      setSummary({
        totalExpenses,
        totalAdvances,
        totalReimbursements,
        balance: totalExpenses + totalReimbursements - totalAdvances
      });
    } catch (err) {
      console.error('Erro ao carregar dados de despesas:', err);
    }
  };

  const refreshData = () => {
    if (travel?.id) {
      loadExpenseData(travel.id);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return 'success';
      case 'inativo':
        return 'warning';
      case 'cancelado':
        return 'error';
      case 'concluido':
      case 'concluído':
        return 'info';
      // Mantém compatibilidade com status antigos temporariamente
      case 'pending':
      case 'pendente':
        return 'warning';
      case 'approved':
      case 'aprovado':
        return 'success';
      case 'rejected':
      case 'rejeitado':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return 'Ativa';
      case 'inativo':
        return 'Inativa';
      case 'cancelado':
        return 'Cancelada';
      case 'concluido':
      case 'concluído':
        return 'Concluída';
      // Mantém compatibilidade com status antigos
      case 'pending':
      case 'pendente':
        return 'Pendente';
      case 'approved':
      case 'aprovado':
        return 'Aprovada';
      case 'rejected':
      case 'rejeitado':
        return 'Rejeitada';
      case 'completed':
        return 'Concluída';
      default:
        return status;
    }
  };

  if (!travel) {
    return (
      <Alert severity="info">
        Carregando dados da viagem...
      </Alert>
    );
  }

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/travels')}
          sx={{ mb: 2 }}
        >
          Voltar para Viagens
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4" component="h1">
            Detalhes da Viagem
          </Typography>
          <Chip
            label={getStatusLabel(travel.status)}
            color={getStatusColor(travel.status) as any}
            size="medium"
            sx={{ 
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          />
        </Box>
        
        <Typography variant="h5" color="primary" sx={{ fontWeight: 'medium' }}>
          {travel.origin} → {travel.destination}
        </Typography>
      </Box>

          {/* Travel Info Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom color="text.secondary">
                    Informações da Viagem
                  </Typography>
                  <Typography variant="body1" color="text.primary" paragraph sx={{ fontSize: '1.1rem' }}>
                    {travel.purpose}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      📅 Período:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {formatDate(travel.startDate)} - {formatDate(travel.endDate)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  
                  {summary && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Resumo Financeiro
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {formatCurrency(summary.balance)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Saldo atual
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab 
                  label={`Despesas (${expenses.length})`}
                  icon={<ReceiptIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Adiantamentos (${advances.length})`}
                  icon={<MoneyIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Reembolsos por Km (${reimbursements.length})`}
                  icon={<CarIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Expenses Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Despesas da Viagem</Typography>
                <ProtectedComponent role="TRAVEL_CREATE">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenExpenseDialog(true)}
                  >
                    Nova Despesa
                  </Button>
                </ProtectedComponent>
              </Box>
              
              <ExpensesList expenses={expenses} />
            </TabPanel>

            {/* Advances Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pedidos de Adiantamento</Typography>
                <ProtectedComponent role="TRAVEL_CREATE">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAdvanceDialog(true)}
                  >
                    Novo Adiantamento
                  </Button>
                </ProtectedComponent>
              </Box>
              
              <AdvanceRequestsList advances={advances} />
            </TabPanel>

            {/* Mileage Reimbursements Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Reembolsos por Quilometragem</Typography>
                <ProtectedComponent role="TRAVEL_CREATE">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenMileageDialog(true)}
                  >
                    Novo Reembolso por Km
                  </Button>
                </ProtectedComponent>
              </Box>
              
              <MileageReimbursementsList 
                reimbursements={reimbursements} 
              />
            </TabPanel>
          </Card>

          {/* Dialogs */}
          <CreateExpenseDialog
            open={openExpenseDialog}
            onClose={() => setOpenExpenseDialog(false)}
            travelId={travel.id!}
            onSuccess={refreshData}
          />

          <CreateAdvanceDialog
            open={openAdvanceDialog}
            onClose={() => setOpenAdvanceDialog(false)}
            travelId={travel.id!}
            onSuccess={refreshData}
          />

          <CreateMileageDialog
            open={openMileageDialog}
            onClose={() => setOpenMileageDialog(false)}
            travelId={travel.id!}
            onSuccess={refreshData}
          />
        </>
  );
};

export default TravelDetailsPage;
