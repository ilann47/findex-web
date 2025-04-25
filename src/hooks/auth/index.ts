import { useCallback, useEffect, useMemo } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { fromUnixTime, isPast } from 'date-fns'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'

import { useAuthGetOne } from '../get/get-auth'
import { useToast } from '../toast'
import { ENDPOINTS } from '@/constants/endpoints'
import { accessTokenAtom, refreshTokenAtom, tabFocusedTimeAtom, userAtom } from '@/contexts/atoms/auth'
import { Credentials, RoleName, User, CreateUserRequestPayload, EmailSchema, VerificationCode, ResetPassword } from '@/schemas/auth'
import { KeycloakService } from '@/service/keycloak'
import { sarfAPI } from '@/shared/sarf'
import { addRequestHeaderFields } from '@/utils/add-request-header-fields'
import { getExpirationTime } from '@/utils/auth'
import { isAxiosError } from 'axios';

const keycloakService = new KeycloakService()

function isKeycloakSetupError(error: unknown): boolean {
    if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        return (
            errorData.error === 'invalid_grant' &&
            typeof errorData.error_description === 'string' &&
            errorData.error_description.includes('Account is not fully set up')
        );
    }
    return false;
}
function isKeycloakEmailAlreadyRecorded(error: unknown): boolean {
    if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object' && 
        error.response.data !== null
       ) {
        const errorData = error.response.data ; 

        if (
            errorData.message &&
            typeof errorData.message === 'object' &&
            typeof errorData.message.en === 'string'
           ) {
            return errorData.message.en.includes('A user already has this email');
        }
    }

    return false;
}


export const useAuth = () => {
	const { notifyError, notifySuccess } = useToast()

	const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
	const [refreshAccessToken, setRefreshAccessToken] = useAtom(refreshTokenAtom)
	const setTabFocusedTime = useSetAtom(tabFocusedTimeAtom)

	const queryClient = useQueryClient()

	const tokenUser = useAtomValue(userAtom)

	const { data: apiUser } = useAuthGetOne<User>({
		endpoint: `${ENDPOINTS.USER}`,
		idParam: {
			idUser: tokenUser?.id,
		},
		enabled: !!tokenUser,
	})

	const user: User | null = useMemo(
		() => (tokenUser ? { ...tokenUser, attributes: apiUser?.attributes } : null),
		[tokenUser, apiUser]
	)

	const logout = useCallback(() => {
		setAccessToken(RESET)
		setRefreshAccessToken(RESET)
		setTabFocusedTime(RESET)
	}, [setAccessToken, setRefreshAccessToken, setTabFocusedTime])

	const updateSession = useCallback((accessToken: string, refreshToken: string) => {
		setAccessToken(accessToken)
		setRefreshAccessToken(refreshToken)
	}, [])

	const login = useCallback(
        async (
            credentials: Credentials,
            onError: (error: unknown) => void,
            onSuccess: () => void
        ) => {
            try {
                const { access_token, refresh_token } = await keycloakService.login(credentials);

                updateSession(access_token, refresh_token);

                queryClient.invalidateQueries(); 

                notifySuccess('auth.login.feedback.success');

                onSuccess();
            } catch (error) {
				console.log(error)

                if (isKeycloakSetupError(error)) {
                    onError(error);
                } else {
                    notifyError('auth.login.feedback.wrong-credentials');
                    onError(error);
                }
            }
        },
        [keycloakService, updateSession, queryClient, notifySuccess, notifyError]
    );

	const register = useCallback(async (registerData: CreateUserRequestPayload, onError: (error: unknown) => void, onSuccess: () => void) => {
		try {
			await keycloakService.createUser(registerData)

			queryClient.invalidateQueries()

			notifySuccess('auth.register.feedback.success')

			onSuccess()
		} catch (error) {
			console.log(error)

			if (isKeycloakEmailAlreadyRecorded(error)) {
				notifyError('auth.register.feedback.email-exists');
				onError(error);
			} else {
				notifyError('auth.register.feedback.error');
				onError(error);
			}
		}
	}, [keycloakService, queryClient, notifySuccess, notifyError]) 

	const email = useCallback(
		async (
			emailData: EmailSchema, 
			onError: (error: unknown) => void,
			onSuccess: (emailExisted: boolean) => void
		) => {
			let emailExisted = false; 
			try {
				await keycloakService.emailExists(emailData);
	
				emailExisted = true;
	
				await keycloakService.updateSendEmail(emailData);
	
			} catch (error: any) { 
				if (error?.response?.status === 404) {
					emailExisted = false;
					try {
						await keycloakService.createSendEmail(emailData);
					} catch (createError) {
						 console.error("Error during createSendEmail:", createError);
						 notifyError('auth.register.feedback.error');
						 onError(createError);
						 return; 
					}
				} else {
					console.error("Unexpected error checking email existence:", error);
					notifyError('auth.login.feedback.error'); 
					onError(error);
					return; 
				}
			}
	
			try {
				 queryClient.invalidateQueries();
				 onSuccess(emailExisted);
			} catch(finalError) {
				 console.error("Error in final steps:", finalError);
				 onError(finalError);
			}
	
		},
		[keycloakService, queryClient, notifyError ]
	);

	const validateEmail = useCallback(
		async (
			email: EmailSchema,
			onError: (error: unknown) => void,
			onSuccess: (emailExisted: boolean) => void
		) => {
			let validEmail = false; 
			try {
	
				await keycloakService.validateEmail(email);
	
			} catch (error: any) { 
					notifyError('auth.register.feedback.error');
					onError(error);

			}
	
			try {
				 queryClient.invalidateQueries();
				 onSuccess(validEmail);
			} catch(finalError) {
				 console.error("Error in final steps:", finalError);
				 onError(finalError);
			}
	
		},
		[keycloakService, queryClient, notifyError ]
	);
	const resetPassword = useCallback(
        async (
            email: EmailSchema,
            resetPasswordData: ResetPassword, 
            onError: (error: unknown) => void,
            onSuccess: (resetSuccessful: boolean) => void
        ) => {
            try {
                await keycloakService.resetPassword(email, resetPasswordData);

                try {
                     await queryClient.invalidateQueries(); 
                } catch (invalidationError) {
                     console.error("Error during query invalidation:", invalidationError);
                     onError(new Error("Query invalidation failed after password reset."));
                     return; 
                }


                onSuccess(true);

            } catch (error: any) {
                    notifyError('auth.register.feedback.error');
                    onError(error);
            }
        },
        [keycloakService, queryClient, notifyError] 
    );
	const verifyEmail = useCallback(
        async (
            verificationCode: VerificationCode,
            onError: (error: unknown) => void,
            onSuccess: () => void
        ) => {
            try {
                await keycloakService.verifyEmail(verificationCode);


                queryClient.invalidateQueries(); 

                onSuccess();
            } catch (error) {
				console.log(error)
                notifyError('auth.login.feedback.error');
                onError(error);
            }
        },
        [keycloakService, updateSession, queryClient, notifySuccess, notifyError]
    );

	const userHasRole = useCallback((roleName: RoleName) => user?.roles.some((role) => role == roleName), [user])

	const refreshSession = useCallback(async () => {
		const refreshExpirationTime = getExpirationTime(refreshAccessToken)

		if (isPast(fromUnixTime(refreshExpirationTime))) return false

		try {
			const { access_token, refresh_token } = await keycloakService.refreshAccessToken(refreshAccessToken)

			updateSession(access_token, refresh_token)

			return true
		} catch (error) {
			console.log(error)
		}

		return false
	}, [refreshAccessToken])

	useEffect(() => {
		addRequestHeaderFields(sarfAPI, { Authorization: `Bearer ${accessToken}` })
	}, [accessToken])

	return {
		user,
		login,
		logout,
		email,
		verifyEmail,
		validateEmail,
		resetPassword,
		register,
		userHasRole,
		refreshSession,
		refreshAccessToken,
	}
}
