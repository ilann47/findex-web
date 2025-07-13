# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-07-13

### ✨ Adicionado

#### 🏛️ Sistema de Interface Administrativa
- **Modo Administrador**: Diretores podem alternar entre modo usuário e administrador via abas no header
- **Sidebar Dinâmico**: Navegação diferente baseada no modo atual (usuário vs administrador)
- **Controle de Acesso de Diretor**: Verificação segura de permissões para funções administrativas
- **HeaderTabs**: Componente de alternância de modo para diretores autorizados

#### 💰 Gerenciamento de Políticas de Despesas
- **CRUD Completo**: Criar, ler, atualizar e excluir políticas de despesas
- **Categorias de Política**: Suporte para viagens, alimentação, transporte e outros tipos
- **Controles Financeiros**: Configuração de valores máximos e limites diários/mensais
- **Regras de Validação**: Exigir recibos, justificativas e restrições de métodos de pagamento
- **Gerenciamento de Status**: Ativar/desativar políticas com toggle
- **Clonagem de Políticas**: Duplicar políticas existentes com modificações
- **Detecção de Conflitos**: Prevenir políticas sobrepostas para mesmas categorias
- **Dashboard de Estatísticas**: Visualizar métricas de uso de políticas
- **Rastreamento de Expiração**: Monitorar políticas próximas do vencimento
- **Validação de Despesas**: Validação em tempo real contra políticas ativas
- **Sugestões de Políticas**: Recomendações baseadas em dados de despesas

#### 🛡️ Segurança e Controle de Acesso
- **DirectorGuard**: Proteção de componentes no nível administrativo
- **Navegação Baseada em Roles**: Interfaces diferentes para diferentes tipos de usuário
- **Configuração de Ambiente**: Gerenciamento seguro de grupos Azure AD
- **Exibição de Roles de Usuário**: Indicação clara de permissões do usuário

#### 📱 Experiência do Usuário
- **Design Responsivo**: Interface administrativa amigável para mobile
- **Estados de Carregamento**: Indicadores de progresso para operações assíncronas
- **Tratamento de Erros**: Mensagens de erro abrangentes e recuperação
- **Notificações Toast**: Feedback de sucesso/erro para ações do usuário
- **Validação de Formulários**: Validação client-side para integridade de dados

### 🏗️ Melhorias na Arquitetura

#### 📁 Estrutura de Componentes
- **DirectorGuard**: Protege rotas exclusivas para administradores
- **HeaderTabs**: Interface de alternância de modo para diretores
- **Sidebar Dinâmico**: Renderização condicional baseada em role do usuário
- **Página de Gerenciamento de Políticas**: Interface CRUD completa

#### 🔗 Camada de Serviço
- **ExpensePolicyService**: Serviço backend abrangente com cache
- **useExpensePolicies Hook**: Hook React com gerenciamento completo de políticas
- **Sistema de Dados Mock**: Pronto para desenvolvimento com dados de teste realistas
- **Pronto para Integração API**: Estruturado para fácil conexão com backend

#### 🎨 Sistema de Tipos
- **Cobertura TypeScript Completa**: Todos os tipos relacionados a políticas definidos
- **Definições de Interface**: Contratos claros para todas as estruturas de dados
- **Suporte a Enum**: Enums para status de política e tipos de filtro
- **Tipos de Validação**: Tratamento estruturado de erros e avisos

### 📚 Documentação

#### 📖 Guias do Usuário
- **ADMIN_TABS.md**: Guia completo da interface administrativa
- **EXPENSE_POLICIES.md**: Documentação detalhada de gerenciamento de políticas
- **ENVIRONMENT_VARIABLES.md**: Instruções de configuração

#### 🔧 Documentação Técnica
- **Arquitetura de Componentes**: Separação clara de responsabilidades
- **Padrões de Serviço**: Padrões consistentes de interação com API
- **Gerenciamento de Estado**: Átomos Jotai para controle de modo admin
- **Estrutura de Roteamento**: Rotas protegidas com acesso baseado em roles

### 🌐 Configuração

#### 🔐 Variáveis de Ambiente
- **Grupos Azure AD**: Configuração de grupos Director, Manager, Finance
- **Endpoints da API**: Configuração de URL do serviço backend
- **Configurações de Desenvolvimento**: Overrides para desenvolvimento local

#### 📋 Gerenciamento de Rotas
- **Rotas Protegidas**: Todas as páginas admin protegidas com DirectorGuard
- **Carregamento Lazy**: Code splitting eficiente para componentes admin
- **Boundaries de Erro**: Tratamento gracioso de erros no nível de rota

### 🧪 Recursos de Desenvolvimento

#### 🎭 Sistema de Dados Mock
- **Dados de Teste Realistas**: 2 políticas de exemplo com informações completas
- **Simulação de API**: Respostas com delay para simular chamadas reais
- **Operações CRUD**: Simulação completa de create, read, update, delete
- **Cenários de Erro**: Condições de erro configuráveis para teste

### 📈 Performance

#### ⚡ Recursos de Otimização
- **Carregamento Lazy de Componentes**: Componentes admin carregados sob demanda
- **Gerenciamento de Cache**: Cache no nível de serviço para dados de políticas
- **Re-renders Eficientes**: Hooks React otimizados e atualizações de estado
- **Bundle Splitting**: Bundles separados para funcionalidade administrativa

### 🔧 Arquivos Modificados/Adicionados
- ✅ **Novo**: Componentes de interface administrativa
- ✅ **Novo**: Sistema de gerenciamento de políticas de despesas
- ✅ **Novo**: Sistema de controle de acesso de diretor
- ✅ **Novo**: Documentação abrangente
- ✅ **Atualizado**: Estrutura de navegação e roteamento
- ✅ **Atualizado**: Configuração de ambiente
- ✅ **Atualizado**: Componentes de interface do usuário

### 🐛 Corrigido
- **Problema de Export**: Resolvido erro de módulo não exportando `expensePolicyService`
- **Estrutura de Classe**: Corrigido estrutura quebrada na classe ExpensePolicyService
- **Cache do Vite**: Limpeza automática de cache para evitar problemas de import
- **Imports Relativos**: Padronização de imports relativos em toda aplicação

## [0.2.0-SNAPSHOT] - 2025-07-12

### Adicionado
- Sistema de autenticação MSAL (Microsoft Authentication Library) v2.0
- Integração com Azure Active Directory para autenticação e autorização
- Sistema de gerenciamento de grupos do Azure AD
- Página de callback para autenticação MSAL
- Sistema completo de gerenciamento de viagens (PayTravel)
- Componente de mapa interativo com marcadores para visualização de viagens
- Schemas de validação para viagens, localizações e calibrações
- Sistema de alarmes com tipagem TypeScript
- Hooks personalizados para integração com APIs GEDV
- Utilitários para validação e decodificação de tokens JWT
- Suporte a múltiplas estratégias de token
- Branding completo do PayTravel com novos logos e ícones
- Documentação completa do projeto
- Documentação das variáveis de ambiente
- Scripts para criação de roles no Azure AD
- Configuração Nginx para deployment em produção
- Suporte para importação de SVGs como componentes React
- Sistema de internacionalização aprimorado (pt-BR/es)

### Alterado
- **BREAKING CHANGE**: Migração completa do Keycloak para MSAL
- **BREAKING CHANGE**: Migração do serviço SARF para GEDV
- **BREAKING CHANGE**: Atualização para React Router v6
- Refatoração completa do sistema de autenticação
- Atualização dos componentes de header e sidebar
- Atualização dos layouts para suporte ao MSAL
- Refatoração dos hooks de dados para integração com GEDV
- Atualização do sistema de roteamento
- Melhoria no sistema de traduções
- Atualização das dependências do projeto
- Configuração do Vite para otimização de SVGs
- Atualização do favicon e meta tags

### Removido
- **BREAKING CHANGE**: Sistema de autenticação Keycloak
- **BREAKING CHANGE**: Serviço SARF
- Páginas de autenticação legadas (signup, reset password, etc.)
- Sistema de gerenciamento de usuários e grupos Keycloak
- Hooks e utilitários obsoletos relacionados ao Keycloak
- Assets e logos do SARF
- Configurações e constantes do Keycloak
- Código morto e dependências não utilizadas

### Corrigido
- Importação correta de SVGs como componentes React
- Problemas de autenticação e autorização
- Erros de tradução em cenários de erro
- Problemas de navegação no sidebar
- Configuração de CORS para APIs

### Segurança
- Implementação de validação robusta de tokens JWT
- Integração segura com Azure AD
- Proteção de rotas baseada em roles
- Headers de autenticação seguros para APIs
- Validação de permissões baseada em grupos do Azure AD

---

## [0.1.0] - 2024

### Adicionado
- Versão inicial do sistema com autenticação Keycloak
- Sistema básico de navegação e layouts

---

## Tipos de Mudanças
- `Adicionado` para novas funcionalidades
- `Alterado` para mudanças em funcionalidades existentes
- `Obsoleto` para funcionalidades que serão removidas em breve
- `Removido` para funcionalidades removidas
- `Corrigido` para correções de bugs
- `Segurança` para convites a usuários atualizarem em caso de vulnerabilidades
