# Configuração de Políticas de Despesas

## Visão Geral

Esta funcionalidade permite que **diretores** configurem e gerenciem políticas de despesas para viagens de negócios. O sistema oferece controle granular sobre limites, validações e regras de aprovação.

## Acesso Restrito

⚠️ **IMPORTANTE**: Esta funcionalidade é **exclusiva para diretores**. O acesso é controlado por:

- Verificação de roles: `TRAVEL_DIRECTOR`, `DIRECTOR`, `ADMIN`
- Verificação de grupos Azure AD: `VITE_AZURE_GROUP_DIRECTOR`
- Lista de usuários autorizados (configurável em desenvolvimento)

## Funcionalidades

### 1. Gestão de Políticas
- ✅ Criar novas políticas de despesas
- ✅ Editar políticas existentes
- ✅ Ativar/desativar políticas
- ✅ Excluir políticas não utilizadas

### 2. Categorias de Despesas Suportadas
- 🍽️ **Alimentação**: Refeições e lanches durante viagens
- 🚗 **Transporte**: Taxi, Uber, transporte público
- 🏨 **Hospedagem**: Hotéis e acomodações
- ⛽ **Combustível**: Abastecimento de veículos
- 📱 **Comunicação**: Telefone, internet
- 📦 **Material**: Material de escritório e suprimentos
- ➕ **Outros**: Outras despesas não categorizadas

### 3. Controles Financeiros
- 💰 **Limite Máximo**: Valor máximo por despesa individual
- 📅 **Limite Diário**: Valor máximo por dia
- 📊 **Limite Mensal**: Valor máximo por mês
- 🎯 **Limites por Grupo**: Configuração específica por função

### 4. Validações e Regras
- 🧾 **Recibo Obrigatório**: Exige comprovante fiscal
- 📝 **Justificativa Obrigatória**: Exige descrição detalhada
- 💳 **Métodos de Pagamento**: Controla formas de pagamento permitidas

### 5. Métodos de Pagamento Suportados
- 💵 **Dinheiro**: Pagamento em espécie
- 💳 **Cartão de Crédito**: Cartão corporativo
- 💳 **Cartão de Débito**: Débito corporativo
- 📱 **PIX**: Transferência instantânea
- 🏦 **Transferência**: Transferência bancária

## Como Usar

### Acessando as Políticas
1. Faça login como diretor
2. No menu lateral, clique em **"Políticas"**
3. A página de configuração será exibida

### Criando uma Nova Política
1. Clique em **"Nova Política"**
2. Preencha as informações básicas:
   - Nome da política
   - Categoria
   - Descrição (opcional)
3. Configure os limites financeiros
4. Defina as regras de validação
5. Selecione os métodos de pagamento permitidos
6. Clique em **"Criar Política"**

### Editando uma Política Existente
1. Na lista de políticas, clique no ícone de edição ✏️
2. Modifique os campos desejados
3. Clique em **"Atualizar Política"**

### Excluindo uma Política
1. Na lista de políticas, clique no ícone de exclusão 🗑️
2. Confirme a exclusão na caixa de diálogo

## Integração com Backend

### Endpoints da API
```typescript
GET    /expense-policies           // Lista todas as políticas
GET    /expense-policies/:id       // Busca política específica
POST   /expense-policies           // Cria nova política
PUT    /expense-policies/:id       // Atualiza política
DELETE /expense-policies/:id       // Exclui política
GET    /expense-policies/:id/limits // Busca limites da política
PUT    /expense-policies/:id/limits // Atualiza limites da política
```

### Estrutura de Dados
```typescript
interface ExpensePolicy {
  id?: number;
  name: string;
  description?: string;
  category: ExpenseCategory;
  maxAmount?: number;
  maxDailyAmount?: number;
  maxMonthlyAmount?: number;
  requiresReceipt: boolean;
  requiresJustification: boolean;
  allowedPaymentMethods: PaymentMethod[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}
```

## Segurança

### Controle de Acesso
- **DirectorGuard**: Componente que protege a página
- **useDirectorAccess**: Hook que verifica permissões
- **Fallback de Acesso Negado**: Interface amigável para usuários sem permissão

### Validações
- Verificação de autenticação
- Verificação de roles/grupos
- Proteção contra acesso direto via URL

## Fallback para Desenvolvimento

Quando o backend não estiver disponível, o sistema utiliza dados mock para demonstração:
- 2 políticas de exemplo (Alimentação e Transporte)
- Dados realistas para testes
- Simulação de delay de API

## Arquivos Relacionados

### Componentes
- `src/pages/expense-policies/index.tsx` - Página principal
- `src/components/auth/DirectorGuard.tsx` - Guard de acesso
- `src/hooks/useDirectorAccess.ts` - Hook de verificação

### Tipos e Serviços
- `src/types/expense-policy.ts` - Tipos TypeScript
- `src/service/expense-policy.ts` - Service layer
- `src/components/menus/sidebar/index.tsx` - Menu lateral

### Configuração
- `src/router.tsx` - Rota `/expense-policies`
- `.env.development` - Variáveis de ambiente

## Próximos Passos

1. 🔄 **Integração com Backend Real**: Conectar com API de produção
2. 📈 **Dashboard de Relatórios**: Visualização de uso das políticas
3. 🔔 **Notificações**: Alertas quando limites forem atingidos
4. 📋 **Auditoria**: Log de alterações nas políticas
5. 🎯 **Limites por Usuário**: Configuração individual além de grupos
