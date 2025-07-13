import React from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  IconButton,
  Collapse,
  SelectChangeEvent
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { TravelStatus } from '@/types/travel';

export interface TravelFilters {
  status: TravelStatus | 'ALL';
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  search: string;
}

export const defaultFilters: TravelFilters = {
  status: 'ALL', // Mostra todas por padrão, mas "Ativas" será destacada
  origin: '',
  destination: '',
  startDate: '',
  endDate: '',
  search: ''
};

interface TravelFiltersComponentProps {
  filters: TravelFilters;
  onFiltersChange: (filters: TravelFilters) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export const TravelFiltersComponent: React.FC<TravelFiltersComponentProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalCount,
  filteredCount
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleFilterChange = (field: keyof TravelFilters) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onFiltersChange({
      ...filters,
      [field]: event.target.value
    });
  };

  const handleSelectChange = (field: keyof TravelFilters) => (
    event: SelectChangeEvent
  ) => {
    onFiltersChange({
      ...filters,
      [field]: event.target.value
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.status !== 'ALL' ||
      filters.origin !== '' ||
      filters.destination !== '' ||
      filters.startDate !== '' ||
      filters.endDate !== '' ||
      filters.search !== ''
    );
  };

  return (
    <Paper elevation={1} sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        {/* Header com resumo dos filtros */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FilterIcon color="primary" />
            <Typography variant="h6">
              Filtros de Viagens
            </Typography>
            <Chip
              label={`${filteredCount} de ${totalCount}`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {hasActiveFilters() && (
              <IconButton 
                onClick={onClearFilters} 
                size="small" 
                title="Limpar filtros"
              >
                <ClearIcon />
              </IconButton>
            )}
            <IconButton 
              onClick={() => setExpanded(!expanded)} 
              size="small"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Filtros rápidos sempre visíveis */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: expanded ? 2 : 0 }}>
          <Chip
            label="Todas"
            color={filters.status === 'ALL' ? 'primary' : 'default'}
            variant={filters.status === 'ALL' ? 'filled' : 'outlined'}
            size="small"
            onClick={() => onFiltersChange({ ...filters, status: 'ALL' })}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Ativas"
            color={filters.status === TravelStatus.ATIVO ? 'success' : 'default'}
            variant={filters.status === TravelStatus.ATIVO ? 'filled' : 'outlined'}
            size="small"
            onClick={() => onFiltersChange({ ...filters, status: TravelStatus.ATIVO })}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Inativas"
            color={filters.status === TravelStatus.INATIVO ? 'warning' : 'default'}
            variant={filters.status === TravelStatus.INATIVO ? 'filled' : 'outlined'}
            size="small"
            onClick={() => onFiltersChange({ ...filters, status: TravelStatus.INATIVO })}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Concluídas"
            color={filters.status === TravelStatus.CONCLUIDO ? 'info' : 'default'}
            variant={filters.status === TravelStatus.CONCLUIDO ? 'filled' : 'outlined'}
            size="small"
            onClick={() => onFiltersChange({ ...filters, status: TravelStatus.CONCLUIDO })}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Canceladas"
            color={filters.status === TravelStatus.CANCELADO ? 'error' : 'default'}
            variant={filters.status === TravelStatus.CANCELADO ? 'filled' : 'outlined'}
            size="small"
            onClick={() => onFiltersChange({ ...filters, status: TravelStatus.CANCELADO })}
            sx={{ cursor: 'pointer' }}
          />
        </Box>

        {/* Filtros expandidos */}
        <Collapse in={expanded}>
          <Grid container spacing={2}>
            {/* Status */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleSelectChange('status')}
                  label="Status"
                >
                  <MenuItem value="ALL">Todas</MenuItem>
                  <MenuItem value={TravelStatus.ATIVO}>Ativas</MenuItem>
                  <MenuItem value={TravelStatus.INATIVO}>Inativas</MenuItem>
                  <MenuItem value={TravelStatus.CONCLUIDO}>Concluídas</MenuItem>
                  <MenuItem value={TravelStatus.CANCELADO}>Canceladas</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Busca geral */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Buscar"
                placeholder="Origem, destino ou objetivo..."
                value={filters.search}
                onChange={handleFilterChange('search')}
              />
            </Grid>

            {/* Origem */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Origem"
                value={filters.origin}
                onChange={handleFilterChange('origin')}
              />
            </Grid>

            {/* Destino */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Destino"
                value={filters.destination}
                onChange={handleFilterChange('destination')}
              />
            </Grid>

            {/* Data início */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Data início"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange('startDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Data fim */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Data fim"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange('endDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </Paper>
  );
};
