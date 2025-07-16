import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box
} from '@mui/material';
import { AdvanceRequestDTO, AdvanceRequestStatus } from '@/types/expense';

interface AdvanceRequestsListProps {
  advances: AdvanceRequestDTO[];
  onUpdate?: () => void;
}

export const AdvanceRequestsList: React.FC<AdvanceRequestsListProps> = ({ advances = [] }) => {
  const getStatusColor = (status: AdvanceRequestStatus) => {
    switch (status) {
      case AdvanceRequestStatus.APPROVED:
        return 'success';
      case AdvanceRequestStatus.REJECTED:
        return 'error';
      case AdvanceRequestStatus.PAID:
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: AdvanceRequestStatus) => {
    const labels = {
      [AdvanceRequestStatus.PENDING]: 'Pendente',
      [AdvanceRequestStatus.APPROVED]: 'Aprovado',
      [AdvanceRequestStatus.REJECTED]: 'Rejeitado',
      [AdvanceRequestStatus.PAID]: 'Pago'
    };
    return labels[status] || status;
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

  if (!advances || advances.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Nenhum adiantamento solicitado ainda.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Valor</TableCell>
            <TableCell>Justificativa</TableCell>
            <TableCell>Data Solicitação</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data Aprovação</TableCell>
            <TableCell>Data Pagamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advances.map((advance) => (
            <TableRow key={advance.advanceId}>
              <TableCell>{formatCurrency(advance.amount, advance.currency)}</TableCell>
              <TableCell>{advance.justification}</TableCell>
              <TableCell>{formatDate(advance.requestDate)}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(advance.status)}
                  color={getStatusColor(advance.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {advance.approvalDate ? formatDate(advance.approvalDate) : '-'}
              </TableCell>
              <TableCell>
                {advance.paymentDate ? formatDate(advance.paymentDate) : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
