import axios, { InternalAxiosRequestConfig } from 'axios';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalInstance, apiRequest } from '../authConfig'; 
import { logTokenValidation } from '@/utils/token-validator';


export const gedvAPI = axios.create({
	baseURL: import.meta.env.VITE_GEDV_API_URL,
});

// Log da configuração para debug
console.log('🔧 Configuração da API GEDV:', {
	baseURL: import.meta.env.VITE_GEDV_API_URL,
	env: import.meta.env.MODE
});

gedvAPI.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const account = msalInstance.getActiveAccount();

        if (!account) {
            return config;
        }

        try {
            
            const response = await msalInstance.acquireTokenSilent({
                ...apiRequest,
                account: account,
                forceRefresh: true, 
            });

            if (response.accessToken) {
                
                
                config.headers.Authorization = `Bearer ${response.accessToken}`;
            } else {
                console.warn('⚠️ Nenhum token obtido na resposta');
            }

        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                console.error("A aquisição silenciosa do token falhou. Pode ser necessário um novo login interativo.", error);
            } else {
                console.error("Ocorreu um erro ao adquirir o token de acesso para a API:", error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const gedvAPIwithoutHeader = axios.create({
	baseURL: import.meta.env.VITE_GEDV_API_URL,
});
export const gedvAPIWithCustomToken = axios.create({
	baseURL: import.meta.env.VITE_GEDV_API_URL,
});

gedvAPIWithCustomToken.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const account = msalInstance.getActiveAccount();

        if (!account) {
            console.warn("Nenhuma conta ativa encontrada. Requisição para a API seguirá sem token.");
            return config;
        }

        try {
            const response = await msalInstance.acquireTokenSilent({
                ...apiRequest,
                account: account,
            });

            if (response.accessToken) {
                config.headers.Authorization = `Bearer ${response.accessToken}`;
            } 

        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                console.error("A aquisição silenciosa do token da API falhou. Pode ser necessário um novo login interativo.", error);
            } else {
                console.error("Ocorreu um erro ao adquirir o token de acesso para a API:", error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Exports dos diferentes tipos de instâncias axios
// Removemos as referencias ao SARF e mantemos apenas GEDV