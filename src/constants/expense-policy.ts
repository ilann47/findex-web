import { ExpenseCategory, PaymentMethod } from '../types/expense-policy';

// Categorias padrão de despesas
export const DEFAULT_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'meal',
    name: 'Alimentação',
    description: 'Despesas com refeições, lanches e bebidas durante viagens',
    icon: '🍽️'
  },
  {
    id: 'transport',
    name: 'Transporte',
    description: 'Despesas com combustível, pedágios, táxi, uber, passagens',
    icon: '🚗'
  },
  {
    id: 'accommodation',
    name: 'Hospedagem',
    description: 'Despesas com hotéis, pousadas e similares',
    icon: '🏨'
  },
  {
    id: 'communication',
    name: 'Comunicação',
    description: 'Despesas com telefone, internet, correios',
    icon: '📞'
  },
  {
    id: 'materials',
    name: 'Materiais',
    description: 'Compra de materiais e equipamentos para trabalho',
    icon: '📦'
  },
  {
    id: 'training',
    name: 'Treinamento',
    description: 'Cursos, workshops, conferências e eventos educacionais',
    icon: '📚'
  },
  {
    id: 'medical',
    name: 'Despesas Médicas',
    description: 'Emergências médicas durante viagens de trabalho',
    icon: '🏥'
  },
  {
    id: 'other',
    name: 'Outras Despesas',
    description: 'Despesas diversas não categorizadas',
    icon: '📋'
  }
];

// Métodos de pagamento padrão
export const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Dinheiro',
    description: 'Pagamento em espécie'
  },
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    description: 'Pagamento com cartão de crédito corporativo ou pessoal'
  },
  {
    id: 'debit_card',
    name: 'Cartão de Débito',
    description: 'Pagamento com cartão de débito'
  },
  {
    id: 'pix',
    name: 'PIX',
    description: 'Transferência instantânea via PIX'
  },
  {
    id: 'bank_transfer',
    name: 'Transferência Bancária',
    description: 'Transferência via TED ou DOC'
  },
  {
    id: 'check',
    name: 'Cheque',
    description: 'Pagamento via cheque'
  },
  {
    id: 'corporate_card',
    name: 'Cartão Corporativo',
    description: 'Cartão de crédito da empresa'
  }
];

// Valores padrão para limites
export const DEFAULT_POLICY_LIMITS = {
  MEAL: {
    maxDailyAmount: 100.00,
    maxAmount: 500.00
  },
  TRANSPORT: {
    maxDailyAmount: 200.00,
    maxAmount: 1000.00
  },
  ACCOMMODATION: {
    maxDailyAmount: 300.00,
    maxAmount: 1500.00
  },
  COMMUNICATION: {
    maxDailyAmount: 50.00,
    maxAmount: 200.00
  },
  MATERIALS: {
    maxAmount: 2000.00
  },
  TRAINING: {
    maxAmount: 5000.00
  },
  MEDICAL: {
    maxAmount: 1000.00
  },
  OTHER: {
    maxDailyAmount: 100.00,
    maxAmount: 500.00
  }
} as const;

// Tags padrão para políticas
export const DEFAULT_POLICY_TAGS = [
  'nacional',
  'internacional',
  'emergencia',
  'executivo',
  'operacional',
  'administrativo',
  'vendas',
  'tecnico'
] as const;

// Regras de negócio padrão
export const POLICY_BUSINESS_RULES = {
  // Valores mínimos que sempre requerem comprovante
  RECEIPT_REQUIRED_THRESHOLD: 50.00,
  
  // Valores que sempre requerem justificativa
  JUSTIFICATION_REQUIRED_THRESHOLD: 200.00,
  
  // Número máximo de políticas ativas por categoria
  MAX_POLICIES_PER_CATEGORY: 5,
  
  // Dias de antecedência para política entrar em vigor
  POLICY_ACTIVATION_DAYS: 7,
  
  // Período padrão de validade (em dias)
  DEFAULT_VALIDITY_PERIOD: 365
} as const;
