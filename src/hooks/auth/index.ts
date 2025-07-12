import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";

/**
 * Hook personalizado para encapsular a lógica de autenticação do Azure.
 */
export const useAuth = () => {
    const { instance, accounts } = useMsal();
    const user = accounts[0];

    const userHasGroup = (groupID: string): boolean => {
        if (!user) return false;
        const groups = user.idTokenClaims?.['groups'] as string[];
        return groups?.includes(groupID) ?? false;
    };

    return {
        user,
        isAuthenticated: !!user, // Uma verificação simples de autenticação
        userHasGroup,
        login: () => instance.loginRedirect(loginRequest),
        logout: () => instance.logoutRedirect(),
    };
};