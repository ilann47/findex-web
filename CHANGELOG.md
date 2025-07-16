# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-07-16

### Adicionado
- 🔐 Sistema de autenticação híbrido (Azure AD + Google OAuth)
- 🎨 Rebranding completo para SIPROV
- 📝 Sistema de roles simplificado (cliente/promotor/admin)
- 💾 Persistência de autenticação via localStorage
- 🔧 Serviço unificado de autenticação (unified-auth.service.ts)
- 🔑 Serviços específicos para Google e Azure
- 🖼️ Novos logos e ícones SIPROV
- 🌐 Suporte a múltiplos provedores de autenticação
- 📱 Interface de login híbrida moderna
- 🛡️ Validação de tokens e persistência de sessão
- 📋 Sistema aprimorado de grupos e permissões
- 🔄 Redirecionamento automático baseado em roles
- 📚 Documentação de configuração OAuth

### Alterado
- ♻️ Migração completa de payTravel/Atlas para SIPROV
- 🔧 Configuração de ambiente aprimorada
- 🎯 Sistema de navegação baseado em roles
- 📊 Interface de usuário atualizada
- 🔗 Integração com backend para validação de roles
- 🎨 Identidade visual unificada

### Removido
- 🗑️ Logs desnecessários (console.log, console.warn, console.info)
- 🚫 Referências antigas ao payTravel e Atlas
- 📁 Arquivos de logo antigos
- 🔧 Configurações obsoletas do Keycloak

### Corrigido
- 🐛 Problema de login em loop
- 🔄 Persistência de sessão entre recarregamentos
- 🎯 Validação de tokens expirados
- 🔐 Gerenciamento de estado de autenticação

### Segurança
- 🔒 Implementação de validação de tokens segura
- 🛡️ Proteção de rotas baseada em roles
- 🔑 Gerenciamento seguro de chaves de localStorage
- 🌐 Configuração segura de CORS

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
