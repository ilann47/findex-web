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
import { MileageReimbursementDTO, ReimbursementStatus } from '@/types/expense';

interface MileageReimbursementsListProps {
  reimbursements: MileageReimbursementDTO[];
  onUpdate?: () => void;
}

export const MileageReimbursementsList: React.FC<MileageReimbursementsListProps> = ({ reimbursements = [] }) => {
  const getStatusColor = (status: ReimbursementStatus) => {
    switch (status) {
      case ReimbursementStatus.APPROVED:
        return 'success';
      case ReimbursementStatus.REJECTED:
        return 'error';
      case ReimbursementStatus.PAID:
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: ReimbursementStatus) => {
    const labels = {
      [ReimbursementStatus.PENDING]: 'Pendente',
      [ReimbursementStatus.APPROVED]: 'Aprovado',
      [ReimbursementStatus.REJECTED]: 'Rejeitado',
      [ReimbursementStatus.PAID]: 'Pago'
    };
    return labels[status] || status;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PY');
  };

  if (!reimbursements || reimbursements.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Nenhum reembolso por quilometragem solicitado ainda.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Origem</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Distância (km)</TableCell>
            <TableCell>Valor/km</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reimbursements.map((reimbursement) => (
            <TableRow key={reimbursement.reimbursementId}>
              <TableCell>{reimbursement.startLocation}</TableCell>
              <TableCell>{reimbursement.endLocation}</TableCell>
              <TableCell>{reimbursement.distance.toFixed(1)} km</TableCell>
              <TableCell>{formatCurrency(reimbursement.ratePerKm)}</TableCell>
              <TableCell>{formatCurrency(reimbursement.totalAmount)}</TableCell>
              <TableCell>{formatDate(reimbursement.date)}</TableCell>
              <TableCell>{reimbursement.vehiclePlate || '-'}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(reimbursement.status)}
                  color={getStatusColor(reimbursement.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
