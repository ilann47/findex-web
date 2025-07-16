import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { GoogleAuthService } from "../../../services/google-auth.service";
import { UnifiedAuthService } from "../../../services/unified-auth.service";
import { BackendAuthService } from "../../../services/backend-auth.service";

const AuthCallback = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processGoogleToken = async (accessToken: string, idToken?: string) => {
    try {
      
      
      
      
      // Buscar informações do usuário com o token
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error('Falha ao obter informações do usuário');
      }
      
      const userInfo = await response.json();
      
      
      // Buscar grupos/roles do usuário no backend
      
      
      // Preferir ID token se disponível, senão usar access token
      const tokenForBackend = idToken || accessToken;
      const userGroups = await BackendAuthService.fetchGoogleUserGroups(userInfo.email, tokenForBackend);
      
      
      // Adicionar grupos ao userInfo
      const userInfoWithGroups = {
        ...userInfo,
        groups: userGroups
      };
      
      // Salvar no UnifiedAuthService
      UnifiedAuthService.setGoogleUser(userInfoWithGroups);
      
      
      
      // Redirecionar para home
      navigate("/", { replace: true });
      
    } catch (error) {
      console.error('❌ AuthCallback: Erro ao processar token Google:', error);
      setError('Erro ao processar token do Google');
    }
  };

  const processGoogleCallback = async (code: string) => {
    try {
      
      
      // O Google OAuth funcionou, agora vamos simplesmente redirecionar 
      // e deixar o UnifiedAuthService detectar a autenticação
      
      
      // Aguardar um pouco e redirecionar para home
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
      
    } catch (error) {
      console.error('❌ AuthCallback: Erro ao processar Google callback:', error);
      setError('Erro ao processar login do Google');
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const error = urlParams.get('error') || hashParams.get('error');
        const code = urlParams.get('code');
        const state = urlParams.get('state') || hashParams.get('state');

        // Verificar erros de OAuth
        if (error) {
          console.error('❌ AuthCallback: Erro OAuth:', error);
          setError(`Erro de autenticação: ${error}`);
          return;
        }

        // Verificar se é callback do Google (baseado no state)
        if (state === 'google_oauth') {
          // Obter tanto access_token quanto id_token do hash
          const accessToken = hashParams.get('access_token');
          const idToken = hashParams.get('id_token');
          
          if (accessToken && idToken) {
            
            await processGoogleToken(accessToken, idToken);
            return;
          } else if (accessToken) {
            
            await processGoogleToken(accessToken);
            return;
          } else if (code) {
            
            await processGoogleCallback(code);
            return;
          }
        }

        // Só processar Azure se não for callback do Google
        if (state !== 'google_oauth') {
          // Processar callback do Azure (código original)
          const response = await instance.handleRedirectPromise();

          if (response && response.account) {
            
            // Define a conta ativa
            instance.setActiveAccount(response.account);
            
            // Aguarda um pouco para garantir que a conta foi definida
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 100);
          } else if (response === null) {
            // Se response é null, pode significar que não há callback para processar
            
            // Verifica se já existe uma conta ativa
            const activeAccount = instance.getActiveAccount();
            if (activeAccount) {
              navigate("/", { replace: true });
            } else {
              navigate("/login", { replace: true });
            }
          } else {
            setError("Falha na autenticação: resposta inválida");
          }
        }
      } catch (err) {
        console.error("❌ AuthCallback: Erro ao processar callback:", err);
        setError("Erro durante a autenticação");
        
        // Em caso de erro, redireciona para login após um delay
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [instance, navigate]);

  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Redirecionando para a página de login...
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="h6">
        {isProcessing ? "Finalizando login..." : "Redirecionando..."}
      </Typography>
    </Box>
  );
};

export default AuthCallback;
