import { useState } from 'react';
import { gedvAPI } from '@/shared/gedv';

interface UseApiCallOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface ApiCallState {
  loading: boolean;
  data: any;
  error: string | null;
}

/**
 * Hook personalizado para fazer chamadas para a API com o token MSAL
 */
export const useApiCall = (options: UseApiCallOptions = {}) => {
  const [state, setState] = useState<ApiCallState>({
    loading: false,
    data: null,
    error: null,
  });

  const callApi = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null, data: null }));

    try {
      console.log(`🔄 Fazendo requisição ${method} para: ${endpoint}`);
      
      let response;
      
      switch (method) {
        case 'GET':
          response = await gedvAPI.get(endpoint);
          break;
        case 'POST':
          response = await gedvAPI.post(endpoint, body);
          break;
        case 'PUT':
          response = await gedvAPI.put(endpoint, body);
          break;
        case 'DELETE':
          response = await gedvAPI.delete(endpoint);
          break;
        default:
          throw new Error(`Método HTTP não suportado: ${method}`);
      }

      console.log(`✅ Resposta da API:`, response.data);
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        data: response.data 
      }));

      options.onSuccess?.(response.data);
      
      return response.data;

    } catch (err: any) {
      console.error(`❌ Erro na requisição ${method} ${endpoint}:`, err);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.statusText ||
                          err.message || 
                          'Erro desconhecido na requisição';

      const fullError = {
        message: errorMessage,
        status: err.response?.status,
        statusText: err.response?.statusText,
        endpoint,
        method
      };

      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));

      options.onError?.(errorMessage);
      
      throw fullError;
    }
  };

  const reset = () => {
    setState({
      loading: false,
      data: null,
      error: null,
    });
  };

  return {
    ...state,
    callApi,
    reset,
  };
};
