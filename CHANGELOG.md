# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [Não Publicado]

## [2.0.0] - 2025-07-12

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

## [1.0.0] - 2024-XX-XX

### Adicionado
- Versão inicial do sistema com autenticação Keycloak
- Sistema básico de navegação e layouts
- Integração inicial com APIs SARF

---

## Tipos de Mudanças
- `Adicionado` para novas funcionalidades
- `Alterado` para mudanças em funcionalidades existentes
- `Obsoleto` para funcionalidades que serão removidas em breve
- `Removido` para funcionalidades removidas
- `Corrigido` para correções de bugs
- `Segurança` para convites a usuários atualizarem em caso de vulnerabilidades
