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
import { ExpenseDTO, ExpenseType, ExpenseStatus } from '@/types/expense';

interface ExpensesListProps {
  expenses: ExpenseDTO[];
  onUpdate?: () => void;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({ expenses = [] }) => {
  // Garantir que expenses é sempre um array
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  const getExpenseTypeLabel = (type: ExpenseType) => {
    const labels = {
      [ExpenseType.ACCOMMODATION]: 'Hospedagem',
      [ExpenseType.MEALS]: 'Alimentação',
      [ExpenseType.TRANSPORT]: 'Transporte',
      [ExpenseType.FUEL]: 'Combustível',
      [ExpenseType.PARKING]: 'Estacionamento',
      [ExpenseType.OTHER]: 'Outros'
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: ExpenseStatus) => {
    switch (status) {
      case ExpenseStatus.APPROVED:
        return 'success';
      case ExpenseStatus.REJECTED:
        return 'error';
      default:
        return 'warning';
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

  if (safeExpenses.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Nenhuma despesa registrada ainda.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!expenses || expenses.length === 0) ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhuma despesa encontrada
              </TableCell>
            </TableRow>
          ) : (
            safeExpenses.map((expense) => (
              <TableRow key={expense.expenseId}>
                <TableCell>{getExpenseTypeLabel(expense.type)}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{formatCurrency(expense.amount, expense.currency)}</TableCell>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>
                  <Chip
                    label={expense.status}
                    color={getStatusColor(expense.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
