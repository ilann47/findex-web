import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  role: string | string[]; // Roles ou IDs de grupos
  allRolesRequired?: boolean; // Mudança de nome para ser mais claro
  children?: React.ReactNode; // Para usar como wrapper component
}

export const AuthorizedRoute = ({ role, allRolesRequired = false, children }: Props) => {
    const { userHasGroup } = useAuth();

    // Este componente assume que a verificação de "isAuthenticated" já foi feita.
    const hasAccess = Array.isArray(role)
      ? allRolesRequired
        ? role.filter(r => r).every((r) => userHasGroup(r)) // Filtra undefined/null
        : role.filter(r => r).some((r) => userHasGroup(r))  // Filtra undefined/null
      : role ? userHasGroup(role) : false; // Verifica se role não é undefined

    if (!hasAccess) {
        // Se é usado no router (sem children), redireciona para unauthorized
        // Se é usado como wrapper (com children), apenas esconde o conteúdo
        return children ? null : <Navigate to="/unauthorized" replace />;
    }

    // Se tem children, renderiza eles; senão renderiza o Outlet para rotas
    return children ? <>{children}</> : <Outlet />;
};

// Alias para compatibilidade
export const ProtectedComponent = AuthorizedRoute;
