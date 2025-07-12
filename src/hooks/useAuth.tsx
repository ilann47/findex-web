import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/authConfig";
import { ROLE_GROUP_MAPPING } from "@/constants/groups";

/**
 * Hook personalizado para encapsular a lógica de autenticação e autorização.
 */
export const useAuth = () => {
    const { instance, accounts } = useMsal();
    const user = accounts[0];

    /**
     * Verifica se o usuário está autenticado
     */
    const isAuthenticated = (): boolean => {
        const activeAccount = instance.getActiveAccount();
        return !!activeAccount || accounts.length > 0;
    };

    /**
     * Verifica se o usuário logado pertence a um grupo específico.
     * @param groupID O ID do grupo a ser verificado ou nome da role
     * @returns `true` se o usuário pertencer ao grupo, `false` caso contrário.
     */
    const userHasGroup = (groupID: string): boolean => {
        if (!user || !user.idTokenClaims || !groupID) {
            return false;
        }

        // Os grupos vêm dentro das "declarações" (claims) do ID Token.
        const groups = user.idTokenClaims?.['groups'] as string[] || [];
        const roles = user.idTokenClaims?.['roles'] as string[] || [];

        // Se é um ID de grupo direto (GUID), verifica diretamente
        if (groupID.includes('-') && groupID.length > 30) {
            return groups.includes(groupID);
        }

        // Se é uma role nomeada, usa o mapeamento
        const mappedGroupId = ROLE_GROUP_MAPPING[groupID];
        if (mappedGroupId) {
            return groups.includes(mappedGroupId);
        }

        // Fallback: verifica se existe o grupo com prefixo ROLE_
        const roleBasedGroup = `ROLE_${groupID}`;
        return roles.includes(roleBasedGroup);
    };

    /**
     * Verifica se o usuário tem uma role específica.
     * @param roleName O nome da role a ser verificada
     * @returns `true` se o usuário tiver a role, `false` caso contrário.
     */
    const userHasRole = (roleName: string): boolean => {
        if (!user) {
            return false;
        }

        // Primeiro verifica se a role está nas roles do token
        const roles = user.idTokenClaims?.['roles'] as string[];
        if (roles?.includes(roleName)) {
            return true;
        }

        // Fallback: verifica se existe algum grupo que corresponde à role
        const groups = user.idTokenClaims?.['groups'] as string[];
        
        // Usa o mapeamento configurado em constants/groups.ts
        const requiredGroupId = ROLE_GROUP_MAPPING[roleName];
        return requiredGroupId ? groups?.includes(requiredGroupId) ?? false : false;
    };

    /**
     * Faz login redirecionando para a Microsoft
     */
    const login = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.error("❌ Erro durante o login:", error);
        }
    };

    /**
     * Faz logout
     */
    const logout = async () => {
        try {
            await instance.logoutRedirect();
        } catch (error) {
            console.error("❌ Erro durante o logout:", error);
        }
    };

    /**
     * Funções placeholder para funcionalidades que ainda não foram implementadas
     */
    const verifyEmail = async () => {
        console.warn("⚠️ verifyEmail não implementado ainda");
    };

    const validateEmail = async () => {
        console.warn("⚠️ validateEmail não implementado ainda");
    };

    const resetPassword = async () => {
        console.warn("⚠️ resetPassword não implementado ainda");
    };

    const register = async () => {
        console.warn("⚠️ register não implementado ainda");
    };

    const email = user?.username || "";

    return {
        user,
        isAuthenticated: isAuthenticated(),
        userHasGroup,
        userHasRole,
        login,
        logout,
        verifyEmail,
        validateEmail,
        resetPassword,
        register,
        email,
    };
};