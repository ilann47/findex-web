import { Credentials, OpenID } from '@/schemas/auth'; 
import keycloakAPI from '@/shared/keycloak'; 

import {
    // UserDataPayloadSchema,
    // UserDataPayload, // Inferred type from UserDataPayloadSchema
    CreateUserResponseSchema,
	CreateUserRequestPayloadSchema,
	CreateUserRequestPayload,
} from '@/schemas/auth'; 
import { saadAPI } from '@/shared/saad';
import axios from 'axios';



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
            const responseToken = await saadAPI.get('/keycloak');
            
            if (typeof responseToken.data !== 'string' || responseToken.data.trim().length === 0) {
                 console.error('Expected a non-empty string token, but received:', responseToken.data);
                 throw new Error('Failed to retrieve a valid access token.');
            }
            const accessToken = responseToken.data.trim(); 

            const response = await saadAPI.post('/auth/user', requestBody, {
                 headers: {
                     'Authorization': `Bearer `+ accessToken,
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
            console.error(`Error creating user ${validatedData.username}:`, error.response?.data || error.message);
            throw error;
        }
    }
}
