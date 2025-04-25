import { Credentials, EmailSchema, OpenID, ResetPassword, VerificationCode } from '@/schemas/auth';
import keycloakAPI from '@/shared/keycloak';

import {
    CreateUserResponseSchema,
	CreateUserRequestPayloadSchema,
	CreateUserRequestPayload,
} from '@/schemas/auth';
import { sarfAPI, sarfAPIwithoutHeader } from '@/shared/sarf';
import { AxiosError } from 'axios';



export class KeycloakService {
    private readonly realm: string;
    private readonly clientID: string;

    constructor() {
        this.realm = import.meta.env.VITE_KEYCLOAK_REALM;
        this.clientID = import.meta.env.VITE_KEYCLOAK_CLIENT;

    }

	private async getAccessToken(params: URLSearchParams): Promise<OpenID> {
        const response = await keycloakAPI.post<OpenID>(`realms/${this.realm}/protocol/openid-connect/token`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    }

    async login(credentials: Credentials): Promise<OpenID> {
        const params = new URLSearchParams({
            client_id: this.clientID,
            grant_type: 'password',
            username: credentials.username,
            password: credentials.password,
        });
        return this.getAccessToken(params);
    }

    async refreshAccessToken(refreshToken: string): Promise<OpenID> {
        const params = new URLSearchParams({
            client_id: this.clientID,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        return this.getAccessToken(params);
    }
    async emailExists(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        const endpoint = '/preauth/email';

        try {
            const response = await sarfAPIwithoutHeader.get(
                endpoint,
                {
                    params: emailData
                }
            );

            console.log(`Response from ${endpoint}:`, response.data);
            const userIdFromResponse = response?.data?.userId;
            return { userId: userIdFromResponse };

        } catch (error: any) {
            if (error.response) {
              console.error('Error Response Status:', error.response.status);
              console.error('Error Response Headers:', error.response.headers);
              console.error('Error Response Data:', error.response.data);
            } else if (error.request) {
              console.error('Error Request:', error.request);
            } else {
              console.error('Error Message:', error.message);
            }
            throw error;
        }
    }
    async createSendEmail(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        const endpoint = '/preauth';

        try {
            const response = await sarfAPIwithoutHeader.post(
                endpoint,
                emailData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(`Response from ${endpoint}:`, response.data);
            const userIdFromResponse = response?.data?.userId;
            return { userId: userIdFromResponse };

        } catch (error: any) {
            if (error.response) {
              console.error('Error Response Status:', error.response.status);
              console.error('Error Response Headers:', error.response.headers);
              console.error('Error Response Data:', error.response.data);
            } else if (error.request) {
              console.error('Error Request:', error.request);
            } else {
              console.error('Error Message:', error.message);
            }
            throw error;
        }
    }
    async updateSendEmail(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        const endpoint = '/preauth';

        try {
            console.log(`Sending email data to ${endpoint} as JSON:`, emailData);

            const response = await sarfAPIwithoutHeader.put(
                endpoint,
                emailData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(`Response from ${endpoint}:`, response.data);
            const userIdFromResponse = response?.data?.userId;
            return { userId: userIdFromResponse };

        } catch (error: any) {
            throw error;
        }
    }
    async verifyEmail(verificationCode: VerificationCode): Promise<{ userId: string | undefined }> {
        const endpoint = '/preauth/code';

        try {
            console.log(`Sending GET request to ${endpoint} with params:`, verificationCode);

            const response = await sarfAPIwithoutHeader.get(
                endpoint,
                {
                    params: verificationCode
                }
            );

            console.log(`Response from GET ${endpoint}:`, response.data);

            const userIdFromResponse = response?.data?.userId;
            return { userId: userIdFromResponse };

        } catch (error: any) {
            throw error;
        }
    }

    async resetPassword(emailData: EmailSchema, resetPasswordData: ResetPassword): Promise<{ userId: string | undefined}> {
        const endpointGetUserID = '/keycloak/user-id';
        const endpointResetPassword = '/auth/user/password';

        const searchUserIDParams = {
            username: emailData.email
        };

        let userId: string | undefined;

        try {
            const responseGetUserId = await sarfAPIwithoutHeader.get(
                endpointGetUserID,
                {
                    params: searchUserIDParams
                }
            );

            const responseDataGetUserID = responseGetUserId?.data;

            if (typeof responseDataGetUserID === 'string' && responseDataGetUserID.trim() !== '') {
                userId = responseDataGetUserID.trim();
            } else {
                throw new Error(`User not found for email: ${emailData.email}`);
            }

            const params = {
                realm: this.realm,
                idUser: userId 
            };
            const resetPasswordBody = {
                params,
                temporary: false, 
                value: resetPasswordData.password 
            };

            const responseToken = await sarfAPI.get('/keycloak'); 

            if (typeof responseToken.data !== 'string' || responseToken.data.trim().length === 0) {
                 throw new Error('Failed to retrieve a valid access token.');
            }
            const accessToken = responseToken.data.trim();

            await sarfAPIwithoutHeader.put(endpointResetPassword, resetPasswordBody, { 
                 headers: {
                     'Authorization': `Bearer ${accessToken}`, 
                     'Content-Type': 'application/json'
                 }
            });
                 return { userId: undefined };

        } catch (error: any) {
            console.error('Error during password reset process:', error);

            if (error instanceof AxiosError) { 
                 console.error('Axios error details:', {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    data: error.response?.data,
                });
                 throw new Error(`Password reset failed: ${error.response?.data?.message || error.message}`);
            } else if (error.message.startsWith('User not found')) {
                 throw error;
            }
            else {
                throw new Error(`Password reset failed: ${error.message || 'Unknown error'}`);
            }
        }
    }
    async validateEmail(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        const endpoint = '/keycloak/validate-email'; 

        const params = {
            username: emailData.email
        };

        try {
            console.log(`Sending PUT request to ${endpoint} with URL parameters:`, params);

            const response = await sarfAPIwithoutHeader.put(
                endpoint,
                null,
                {
                    params: params 
                }
            );

            console.log(`Response from PUT ${endpoint}:`, response.data);

            const responseData = response?.data;
            const potentialUserId = (typeof responseData === 'string' && responseData.trim() !== '') ? responseData.trim() : undefined;

            return { userId: potentialUserId };

        } catch (error: any) {
             if (error.response) {
                console.error(`Error validating email ${emailData.email}:`);
                console.error('Error Response Status:', error.response.status);
                console.error('Error Response Headers:', error.response.headers);
                console.error('Error Response Data:', error.response.data);
             } else if (error.request) {
                console.error('Error Request:', error.request);
             } else {
                console.error('Error Message:', error.message);
             }
             throw error;
        }
    }

    async createUser(createData: CreateUserRequestPayload): Promise<{ userId: string | undefined }> {
        const validationResult = CreateUserRequestPayloadSchema.safeParse(createData);
        if (!validationResult.success) {
            console.error("Invalid user creation data:", validationResult.error.errors);
            throw validationResult.error;
        }
        const validatedData = validationResult.data;

        const requestBody = {
            ...validatedData,
        };

		try {
            const responseToken = await sarfAPI.get('/keycloak'); 

            if (typeof responseToken.data !== 'string' || responseToken.data.trim().length === 0) {
                 console.error('Expected a non-empty string token, but received:', responseToken.data);
                 throw new Error('Failed to retrieve a valid access token.');
            }
            const accessToken = responseToken.data.trim();

            const response = await sarfAPIwithoutHeader.post('/auth/user', requestBody, { 
                 headers: {
                     'Authorization': `Bearer ${accessToken}`, 
                     'Content-Type': 'application/json'
                 }
            });

            const responseValidation = CreateUserResponseSchema.safeParse(response.data);
            if (!responseValidation.success) {
                 console.warn("User created, but API response structure is unexpected.", response.data);
                 console.error("Response validation errors:", responseValidation.error.errors);
                 return { userId: undefined };
            }

            const validatedResponseData = responseValidation.data;
            const newUserId = validatedResponseData.id ?? validatedResponseData.userId;

            if (newUserId) {
                 console.log(`User created successfully with ID: ${newUserId}`);
                 return { userId: newUserId };
            } else {
                 console.warn("User created, but API did not return a user ID in the validated response.", validatedResponseData);
                 return { userId: undefined };
            }

        } catch (error: any) {
            const errorDetails = error.response?.data || error.message || error;
            console.error(`Error creating user ${validatedData.username}:`, errorDetails);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            }
            throw error;
        }
    }
}