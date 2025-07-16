import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  CircularProgress,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CloneIcon,
  Analytics as StatsIcon
} from '@mui/icons-material';
import { DirectorGuard } from '../../components/auth/DirectorGuard';
import { ViewLayout } from '../../layouts/view';
import { CreateExpensePolicyRequest } from '../../types/expense-policy';
import { useExpensePolicies } from '../../hooks/useExpensePolicies';

const ExpensePoliciesPage: React.FC = () => {
  const {
    policies,
    loading,
    error,
    createPolicy,
    updatePolicy,
    deletePolicy,
    togglePolicyStatus,
    clonePolicy,
    getStatistics,
    categories,
    paymentMethods,
    clearError
  } = useExpensePolicies();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<number | null>(null);
  const [statsDialog, setStatsDialog] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const [formData, setFormData] = useState<CreateExpensePolicyRequest>({
    name: '',
    description: '',
    categoryId: categories[0]?.id || '',
    maxAmount: 0,
    maxDailyAmount: undefined,
    maxMonthlyAmount: undefined,
    requiresReceipt: true,
    requiresJustification: false,
    allowedPaymentMethodIds: [paymentMethods[0]?.id || ''],
    isActive: true,
    tags: []
  });

  const handleOpenDialog = (policyId?: number) => {
    if (policyId) {
      const policy = policies.find(p => p.id === policyId);
      if (policy) {
        setEditingPolicy(policyId);
        setFormData({
          name: policy.name,
          description: policy.description || '',
          categoryId: policy.category.id,
          maxAmount: policy.maxAmount,
          maxDailyAmount: policy.maxDailyAmount,
          maxMonthlyAmount: policy.maxMonthlyAmount,
          requiresReceipt: policy.requiresReceipt,
          requiresJustification: policy.requiresJustification,
          allowedPaymentMethodIds: policy.allowedPaymentMethods.map(pm => pm.id),
          isActive: policy.isActive,
          validFrom: policy.validFrom,
          validUntil: policy.validUntil,
          tags: policy.tags || []
        });
      }
    } else {
      setEditingPolicy(null);
      setFormData({
        name: '',
        description: '',
        categoryId: categories[0]?.id || '',
        maxAmount: 0,
        maxDailyAmount: undefined,
        maxMonthlyAmount: undefined,
        requiresReceipt: true,
        requiresJustification: false,
        allowedPaymentMethodIds: [paymentMethods[0]?.id || ''],
        isActive: true,
        tags: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPolicy(null);
    clearError();
  };

  const handleSubmit = async () => {
    try {
      if (editingPolicy) {
        const result = await updatePolicy(editingPolicy, formData);
        if (result) {
          handleCloseDialog();
          
        }
      } else {
        const result = await createPolicy(formData);
        if (result) {
          handleCloseDialog();
          
        }
      }
    } catch (error) {
      console.error('❌ Erro ao salvar política:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta política?')) {
      const success = await deletePolicy(id);
      if (success) {
        
      }
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    const success = await togglePolicyStatus(id, !isActive);
    if (success) {
      
    }
  };

  const handleClone = async (id: number) => {
    const newName = prompt('Digite o nome para a política clonada:');
    if (newName && newName.trim()) {
      const cloned = await clonePolicy(id, newName.trim());
      if (cloned) {
        
      }
    }
  };

  const showStatistics = async () => {
    const stats = await getStatistics();
    if (stats) {
      setStatistics(stats);
      setStatsDialog(true);
    }
  };

  if (loading) {
    return (
      <DirectorGuard>
        <ViewLayout.Root>
          <ViewLayout.Header.Root>
            <ViewLayout.Header.Title>
              Políticas de Despesas
            </ViewLayout.Header.Title>
          </ViewLayout.Header.Root>
          <ViewLayout.Content>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          </ViewLayout.Content>
        </ViewLayout.Root>
      </DirectorGuard>
    );
  }

  return (
    <DirectorGuard>
      <ViewLayout.Root>
        <ViewLayout.Header.Root>
          <ViewLayout.Header.Title>
            Políticas de Despesas
          </ViewLayout.Header.Title>
          <ViewLayout.Header.RightElements>
            <Button
              variant="outlined"
              startIcon={<StatsIcon />}
              onClick={showStatistics}
              sx={{ mr: 1 }}
            >
              Estatísticas
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Nova Política
            </Button>
          </ViewLayout.Header.RightElements>
        </ViewLayout.Header.Root>

        <ViewLayout.Content>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Valor Máximo</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Validade</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{policy.name}</Typography>
                        {policy.description && (
                          <Typography variant="caption" color="text.secondary">
                            {policy.description}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={policy.category.name} 
                        size="small" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell>
                      R$ {policy.maxAmount.toFixed(2)}
                      {policy.maxDailyAmount && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          Diário: R$ {policy.maxDailyAmount.toFixed(2)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={policy.isActive}
                            onChange={() => handleToggleStatus(policy.id, policy.isActive)}
                            size="small"
                          />
                        }
                        label={policy.isActive ? 'Ativo' : 'Inativo'}
                        labelPlacement="start"
                      />
                    </TableCell>
                    <TableCell>
                      {policy.validFrom && (
                        <Typography variant="caption" display="block">
                          De: {new Date(policy.validFrom).toLocaleDateString()}
                        </Typography>
                      )}
                      {policy.validUntil && (
                        <Typography variant="caption" display="block">
                          Até: {new Date(policy.validUntil).toLocaleDateString()}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(policy.id)}
                        title="Editar"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleClone(policy.id)}
                        title="Clonar"
                      >
                        <CloneIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(policy.id)}
                        title="Excluir"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog para criar/editar política */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>
              {editingPolicy ? 'Editar Política' : 'Nova Política'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                <TextField
                  label="Nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  required
                />
                
                <TextField
                  label="Descrição"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                />

                <FormControl fullWidth>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    label="Categoria"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Valor Máximo"
                    type="number"
                    value={formData.maxAmount}
                    onChange={(e) => setFormData({ ...formData, maxAmount: Number(e.target.value) })}
                    fullWidth
                    required
                    InputProps={{ startAdornment: 'R$' }}
                  />
                  
                  <TextField
                    label="Limite Diário"
                    type="number"
                    value={formData.maxDailyAmount || ''}
                    onChange={(e) => setFormData({ ...formData, maxDailyAmount: e.target.value ? Number(e.target.value) : undefined })}
                    fullWidth
                    InputProps={{ startAdornment: 'R$' }}
                  />
                </Box>

                <TextField
                  label="Limite Mensal"
                  type="number"
                  value={formData.maxMonthlyAmount || ''}
                  onChange={(e) => setFormData({ ...formData, maxMonthlyAmount: e.target.value ? Number(e.target.value) : undefined })}
                  fullWidth
                  InputProps={{ startAdornment: 'R$' }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requiresReceipt}
                        onChange={(e) => setFormData({ ...formData, requiresReceipt: e.target.checked })}
                      />
                    }
                    label="Requer Comprovante"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.requiresJustification}
                        onChange={(e) => setFormData({ ...formData, requiresJustification: e.target.checked })}
                      />
                    }
                    label="Requer Justificativa"
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Política Ativa"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button onClick={handleSubmit} variant="contained">
                {editingPolicy ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog de Estatísticas */}
          <Dialog open={statsDialog} onClose={() => setStatsDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Estatísticas das Políticas</DialogTitle>
            <DialogContent>
              {statistics && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                  <Typography>
                    <strong>Total de Políticas:</strong> {statistics.totalPolicies}
                  </Typography>
                  <Typography>
                    <strong>Políticas Ativas:</strong> {statistics.activePolicies}
                  </Typography>
                  <Typography>
                    <strong>Políticas Expiradas:</strong> {statistics.expiredPolicies}
                  </Typography>
                  <Typography>
                    <strong>Valor Médio Máximo:</strong> R$ {statistics.averageMaxAmount.toFixed(2)}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Categorias com Mais Políticas:
                  </Typography>
                  {statistics.categoriesWithMostPolicies.map((item: any, index: number) => (
                    <Typography key={index}>
                      {item.category}: {item.count} política(s)
                    </Typography>
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setStatsDialog(false)}>Fechar</Button>
            </DialogActions>
          </Dialog>
        </ViewLayout.Content>
      </ViewLayout.Root>
    </DirectorGuard>
  );
};

export default ExpensePoliciesPage;
