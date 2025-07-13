import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDirectorAccess } from '../../hooks/useDirectorAccess';

interface DirectorGuardProps {
  children: React.ReactNode;
}

export const DirectorGuard: React.FC<DirectorGuardProps> = ({ children }) => {
  const { hasDirectorAccess, user } = useDirectorAccess();

  // Se não há usuário logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se não tem acesso de diretor, redireciona para página principal
  if (!hasDirectorAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
