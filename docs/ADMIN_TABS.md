# Sistema de Abas de Administrador

## Visão Geral

O sistema implementa uma interface administrativa separada que permite aos diretores alternar entre o modo usuário normal e o modo administrador através de abas no header.

## Funcionalidades

### 🔒 Controle de Acesso
- **Usuários normais**: Veem apenas a aba "Usuário" e podem acessar apenas funcionalidades básicas
- **Diretores**: Veem ambas as abas ("Usuário" e "Administrador") e podem alternar entre os modos

### 📱 Interface Dinâmica
- **Modo Usuário**: Sidebar mostra apenas opções de navegação básicas (ex: Viagens)
- **Modo Administrador**: Sidebar mostra opções de gestão do sistema

## Componentes Principais

### 1. HeaderTabs (`src/components/menus/header/tabs.tsx`)
- Renderiza as abas no header
- Controla o estado do modo administrativo
- Só aparece para usuários com permissões de diretor

### 2. Sidebar Dinâmico (`src/components/menus/sidebar/index.tsx`)
- Renderiza diferentes conjuntos de opções baseado no modo atual
- **Modo Usuário**: `renderUserTabs()`
- **Modo Administrador**: `renderAdminTabs()`

### 3. Contexto de Estado (`src/contexts/atoms/admin-mode.ts`)
- `isAdminModeAtom`: Controla se está no modo administrador
- `canAccessAdminModeAtom`: Verifica se o usuário pode acessar o modo admin

## Páginas Administrativas

### ✅ Implementadas
- **Políticas de Despesas** (`/expense-policies`): Gerenciamento completo com CRUD
- **Usuários** (`/users`): Placeholder para futuro desenvolvimento
- **Relatórios** (`/reports`): Placeholder para analytics e relatórios
- **Configurações** (`/settings`): Placeholder para configurações do sistema

### 🔧 Estrutura de Permissões
Todas as páginas administrativas são protegidas pelo `DirectorGuard` que:
- Verifica se o usuário tem permissões de diretor
- Redireciona usuários não autorizados
- Mostra mensagem de acesso negado para usuários sem permissão

## Como Usar

### Para Usuários Normais
1. Faça login no sistema
2. Use normalmente as funcionalidades disponíveis no sidebar
3. As abas de administrador não aparecerão

### Para Diretores
1. Faça login como diretor
2. No header, você verá duas abas: "Usuário" e "Administrador"
3. Clique em "Administrador" para entrar no modo admin
4. O sidebar mudará para mostrar opções administrativas
5. Clique em "Usuário" para voltar ao modo normal

## Configuração de Permissões

As permissões de diretor são controladas pelo hook `useDirectorAccess` que verifica se o email do usuário está na lista de administradores:

```typescript
// src/hooks/useDirectorAccess.ts
const adminEmails = [
  'admin@example.com',
  'director@example.com'
];
```

## Desenvolvimento Futuro

### Próximas Funcionalidades
1. **Gestão de Usuários**: CRUD completo para usuários do sistema
2. **Relatórios**: Dashboard com métricas e analytics
3. **Configurações**: Parâmetros globais do sistema
4. **Auditoria**: Logs de ações administrativas

### Extensibilidade
O sistema foi projetado para ser facilmente extensível:
- Adicione novas páginas em `src/pages/`
- Registre as rotas em `src/router.tsx`
- Adicione os botões no `renderAdminTabs()`
- Implemente controles de acesso apropriados

## Segurança

- ✅ Todas as rotas administrativas são protegidas
- ✅ Controle de acesso baseado em permissões de usuário
- ✅ Interface adapta-se dinamicamente às permissões
- ✅ Fallback seguro para usuários sem permissão
