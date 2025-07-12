# Configuração de Variáveis de Ambiente

## Visão Geral

Este projeto usa variáveis de ambiente para configurar a autenticação Azure AD, URLs da API e grupos de usuários. Este documento explica como configurar essas variáveis.

## Arquivos de Configuração

### 1. Arquivo `.env` (Principal)
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

### 2. Variáveis Obrigatórias

#### Autenticação Azure AD
```env
VITE_AZURE_CLIENT_ID=seu-client-id-aqui
VITE_AZURE_TENANT_ID=seu-tenant-id-aqui
```

#### API Backend
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Variáveis Opcionais

#### URLs de Redirecionamento
```env
VITE_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/login
```

#### Scopes de Autenticação
```env
VITE_AZURE_LOGIN_SCOPES=User.Read,openid,profile,email
```

#### Grupos do Azure AD
```env
VITE_AZURE_GROUP_GERAL=id-do-grupo-geral
VITE_AZURE_GROUP_AUTH_ADMIN=id-do-grupo-admin
VITE_AZURE_GROUP_TRAVELS=id-do-grupo-viagens
```

## Como Obter os Valores

### 1. Azure AD Application Registration

1. Acesse o [Azure Portal](https://portal.azure.com)
2. Vá para "Azure Active Directory" > "App registrations"
3. Clique em "New registration" ou selecione sua aplicação existente
4. Anote o **Application (client) ID** e **Directory (tenant) ID**

### 2. Grupos do Azure AD

1. No Azure Portal, vá para "Azure Active Directory" > "Groups"
2. Clique no grupo desejado
3. Copie o **Object ID**

### 3. URLs da API

- **Desenvolvimento**: `http://localhost:8080/api`
- **Staging**: `https://api-staging.seudominio.com/api`
- **Produção**: `https://api.seudominio.com/api`

## Configuração por Ambiente

### Desenvolvimento Local
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_NODE_ENV=development
```

### Staging
```env
VITE_API_BASE_URL=https://api-staging.seudominio.com/api
VITE_REDIRECT_URI=https://app-staging.seudominio.com/auth/callback
VITE_NODE_ENV=staging
```

### Produção
```env
VITE_API_BASE_URL=https://api.seudominio.com/api
VITE_REDIRECT_URI=https://app.seudominio.com/auth/callback
VITE_NODE_ENV=production
```

## Validação das Variáveis

O sistema irá:

1. **Verificar** se as variáveis obrigatórias estão definidas
2. **Usar valores padrão** para variáveis opcionais
3. **Mostrar logs** no console indicando quais valores estão sendo usados

### Logs de Debug

No console do navegador, você verá:
```
✅ Azure Client ID: 49c77...
✅ Azure Tenant ID: a2e43...
✅ API Base URL: http://localhost:8080/api
⚠️ Usando valor padrão para REDIRECT_URI
```

## Segurança

### ⚠️ Importante
- **Nunca** commite o arquivo `.env` com valores reais
- Use `.env.local` para valores locais específicos
- Em produção, configure as variáveis no serviço de hosting

### Arquivos Ignorados
O `.gitignore` já está configurado para ignorar:
```
.env
.env.local
.env.*.local
```

## Solução de Problemas

### Erro: "VITE_AZURE_CLIENT_ID não definido"
1. Verifique se o arquivo `.env` existe
2. Verifique se a variável está definida corretamente
3. Reinicie o servidor de desenvolvimento

### Erro: "Token request failed"
1. Verifique se o `VITE_AZURE_CLIENT_ID` está correto
2. Verifique se o `VITE_AZURE_TENANT_ID` está correto
3. Verifique se as URLs de redirecionamento estão configuradas no Azure AD

### Erro: "401 Unauthorized" na API
1. Verifique se o `VITE_API_BASE_URL` está correto
2. Verifique se o backend está rodando
3. Verifique se o backend está configurado para aceitar tokens do Azure AD

## Exemplos de Configuração

### Configuração Mínima (apenas travels)
```env
VITE_AZURE_CLIENT_ID=49c77220-ccf2-41b3-beee-0a87b41ba876
VITE_AZURE_TENANT_ID=a2e439ab-9416-41aa-b997-d3e9d5ce384d
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AZURE_GROUP_TRAVELS=367e0069-4e27-4580-b59b-ab637087ba9b
```

### Configuração Completa
```env
# Azure AD
VITE_AZURE_CLIENT_ID=49c77220-ccf2-41b3-beee-0a87b41ba876
VITE_AZURE_TENANT_ID=a2e439ab-9416-41aa-b997-d3e9d5ce384d
VITE_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/login
VITE_AZURE_LOGIN_SCOPES=User.Read,openid,profile,email

# API
VITE_API_BASE_URL=http://localhost:8080/api

# Grupos
VITE_AZURE_GROUP_GERAL=367e0069-4e27-4580-b59b-ab637087ba9b
VITE_AZURE_GROUP_TRAVELS=367e0069-4e27-4580-b59b-ab637087ba9b

# App
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```
