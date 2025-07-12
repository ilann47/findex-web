import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

const AuthCallback = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
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
