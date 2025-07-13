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
  Divider,
  Alert,
  Skeleton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';
import { TravelDTO } from '@/types/travel';
import { ExpenseDTO, AdvanceRequestDTO, MileageReimbursementDTO } from '@/types/expense';
import { travelService } from '@/service/travels';
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
  
  const [travel, setTravel] = useState<TravelDTO | null>(null);
  const [expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [advances, setAdvances] = useState<AdvanceRequestDTO[]>([]);
  const [reimbursements, setReimbursements] = useState<MileageReimbursementDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    if (travelId && !isNaN(parseInt(travelId))) {
      loadTravelData(parseInt(travelId));
    } else {
      setError('ID da viagem inválido');
      setLoading(false);
    }
  }, [travelId]);

  const loadTravelData = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      // Load travel details
      const travelData = await travelService.getTravelById(id);
      setTravel(travelData);

      // Load related data
      await Promise.all([
        loadExpenses(id),
        loadAdvances(id),
        loadReimbursements(id)
      ]);
      
      // Calculate summary after loading data
      loadSummary();

    } catch (error) {
      console.error('❌ Erro ao carregar dados da viagem:', error);
      setError('Erro ao carregar dados da viagem');
    } finally {
      setLoading(false);
    }
  };

  const loadExpenses = async (travelId: number) => {
    try {
      const expensesData = await expenseService.getExpensesByTravelId(travelId);
      setExpenses(expensesData);
    } catch (error) {
      console.error('❌ Erro ao carregar despesas:', error);
    }
  };

  const loadAdvances = async (travelId: number) => {
    try {
      const advancesData = await expenseService.getAdvanceRequestsByTravelId(travelId);
      setAdvances(advancesData);
    } catch (error) {
      console.error('❌ Erro ao carregar adiantamentos:', error);
    }
  };

  const loadReimbursements = async (travelId: number) => {
    try {
      const reimbursementsData = await expenseService.getMileageReimbursementsByTravelId(travelId);
      setReimbursements(reimbursementsData);
    } catch (error) {
      console.error('❌ Erro ao carregar reembolsos:', error);
    }
  };

  // Recalculate summary whenever data changes
  useEffect(() => {
    loadSummary();
  }, [expenses, advances, reimbursements]);

  const loadSummary = async () => {
    try {
      // Calculate summary locally from loaded data
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const totalAdvances = advances.reduce((sum, advance) => sum + advance.amount, 0);
      const totalReimbursements = reimbursements.reduce((sum, reimb) => sum + reimb.totalAmount, 0);
      const balance = totalAdvances - totalExpenses - totalReimbursements;
      
      setSummary({
        totalExpenses,
        totalAdvances,
        totalReimbursements,
        balance
      });
    } catch (error) {
      console.error('❌ Erro ao calcular resumo:', error);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'error';
      case 'COMPLETED': return 'info';
      case 'CANCELLED': return 'default';
      default: return 'warning';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'PYG') => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PY');
  };

  const refreshData = () => {
    if (travelId) {
      loadTravelData(parseInt(travelId));
    }
  };

  const travelIdNum = travelId ? parseInt(travelId) : 0;

  // Verificação inicial de ID válido
  if (!travelId || isNaN(travelIdNum)) {
    return (
      <ViewLayout.Root>
        <ViewLayout.Content>
          <Box sx={{ p: 3 }}>
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
          </Box>
        </ViewLayout.Content>
      </ViewLayout.Root>
    );
  }

  return (
    <ProtectedComponent role="TRAVEL_LIST">
      <TravelAccessGuard travelId={travelIdNum}>
        <ViewLayout.Root>
        <ViewLayout.Content>
          <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/travels')}
                sx={{ mb: 2 }}
              >
                Voltar para Viagens
              </Button>
              
              <Typography variant="h4" component="h1" gutterBottom>
                Detalhes da Viagem
              </Typography>
            </Box>

            {/* Travel Info Card */}
            {travel && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      {travel.origin} → {travel.destination}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {travel.purpose}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(travel.startDate)} - {formatDate(travel.endDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                    <Chip
                      label={travel.status}
                      color={getStatusColor(travel.status) as any}
                      sx={{ mb: 2 }}
                    />
                    {summary && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Gastos Totais: {formatCurrency(summary.totalExpenses)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Adiantamentos: {formatCurrency(summary.totalAdvances)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reembolsos: {formatCurrency(summary.totalReimbursements)}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body1" fontWeight="bold">
                          Saldo: {formatCurrency(summary.balance)}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            )}

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

              <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Despesas</Typography>
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
                
                <ExpensesList 
                  expenses={expenses} 
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Adiantamentos</Typography>
                  <ProtectedComponent role="TRAVEL_CREATE">
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenAdvanceDialog(true)}
                    >
                      Solicitar Adiantamento
                    </Button>
                  </ProtectedComponent>
                </Box>
                
                <AdvanceRequestsList 
                  advances={advances} 
                />
              </TabPanel>

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
              travelId={parseInt(travelId!)}
              onSuccess={refreshData}
            />

            <CreateAdvanceDialog
              open={openAdvanceDialog}
              onClose={() => setOpenAdvanceDialog(false)}
              travelId={parseInt(travelId!)}
              onSuccess={refreshData}
            />

            <CreateMileageDialog
              open={openMileageDialog}
              onClose={() => setOpenMileageDialog(false)}
              travelId={parseInt(travelId!)}
              onSuccess={refreshData}
            />
          </Box>
        </ViewLayout.Content>
      </ViewLayout.Root>
      </TravelAccessGuard>
    </ProtectedComponent>
  );
};

export default TravelDetailsPage;
