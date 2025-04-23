import { Credentials, EmailSchema, OpenID, VerificationCode } from '@/schemas/auth';
import keycloakAPI from '@/shared/keycloak';

import {
    // UserDataPayloadSchema,
    // UserDataPayload, // Inferred type from UserDataPayloadSchema
    CreateUserResponseSchema,
	CreateUserRequestPayloadSchema,
	CreateUserRequestPayload,
} from '@/schemas/auth';
import { sarfAPI, sarfAPIwithoutHeader } from '@/shared/sarf';



export class KeycloakService {
    private readonly realm: string;
    private readonly clientID: string;

    constructor() {
        this.realm = import.meta.env.VITE_KEYCLOAK_REALM;
        this.clientID = import.meta.env.VITE_KEYCLOAK_CLIENT;

    }

	private async getAccessToken(params: URLSearchParams): Promise<OpenID> {
        // ... (implementation unchanged)
        const response = await keycloakAPI.post<OpenID>(`realms/${this.realm}/protocol/openid-connect/token`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        console.log(response.data)
        return response.data;
    }

    async login(credentials: Credentials): Promise<OpenID> {
        // ... (implementation unchanged)
        const params = new URLSearchParams({
            client_id: this.clientID,
            grant_type: 'password',
            username: credentials.username,
            password: credentials.password,
        });
        return this.getAccessToken(params);
    }

    async refreshAccessToken(refreshToken: string): Promise<OpenID> {
        // ... (implementation unchanged)
        const params = new URLSearchParams({
            client_id: this.clientID,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        return this.getAccessToken(params);
    }
    async emailExists(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        // ... (implementation unchanged)
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
        // ... (implementation unchanged)
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
        // ... (implementation unchanged)
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
        // ... (implementation unchanged)
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

    // --- CORRECTED METHOD ---
    async validateEmail(emailData: EmailSchema): Promise<{ userId: string | undefined }> {
        const endpoint = '/keycloak/validate-email'; // Assuming '/keycloak' is the base path for the controller

        // The backend expects a request parameter named 'username', which should be the email string
        const params = {
            username: emailData.email
        };

        try {
            console.log(`Sending PUT request to ${endpoint} with URL parameters:`, params);

            // For PUT with URL params: put(url, data, config)
            // data is the request body (null or {} if none needed)
            // config contains the 'params' object for URL parameters
            const response = await sarfAPIwithoutHeader.put(
                endpoint,
                null, // No request body needed for this endpoint
                {
                    params: params // This will append ?username=... to the URL
                }
            );

            console.log(`Response from PUT ${endpoint}:`, response.data);

            // The backend returns a String, which might be the userId or a confirmation message.
            // Let's assume it might be the userId if it's a non-empty string.
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
             // Re-throw the error so the caller can handle it
             throw error;
        }
    }
    // --- END OF CORRECTION ---

    async createUser(createData: CreateUserRequestPayload): Promise<{ userId: string | undefined }> {
        // ... (implementation likely correct, but review based on backend endpoint)
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
            const responseToken = await sarfAPI.get('/keycloak'); // Is this the right endpoint to get the token?

            if (typeof responseToken.data !== 'string' || responseToken.data.trim().length === 0) {
                 console.error('Expected a non-empty string token, but received:', responseToken.data);
                 throw new Error('Failed to retrieve a valid access token.');
            }
            const accessToken = responseToken.data.trim();

            const response = await sarfAPIwithoutHeader.post('/auth/user', requestBody, { // Is '/auth/user' the correct endpoint?
                 headers: {
                     'Authorization': `Bearer ${accessToken}`, // Corrected template literal
                     'Content-Type': 'application/json'
                 }
            });

            const responseValidation = CreateUserResponseSchema.safeParse(response.data);
            if (!responseValidation.success) {
                 console.warn("User created, but API response structure is unexpected.", response.data);
                 console.error("Response validation errors:", responseValidation.error.errors);
                 // Decide if you want to return undefined or throw an error on unexpected response
                 return { userId: undefined };
            }

            const validatedResponseData = responseValidation.data;
            // Ensure the schema or logic correctly identifies the ID field (id vs userId)
            const newUserId = validatedResponseData.id ?? validatedResponseData.userId;

            if (newUserId) {
                 console.log(`User created successfully with ID: ${newUserId}`);
                 return { userId: newUserId };
            } else {
                 console.warn("User created, but API did not return a user ID in the validated response.", validatedResponseData);
                 return { userId: undefined };
            }

        } catch (error: any) {
            // Log specific details if available
            const errorDetails = error.response?.data || error.message || error;
            console.error(`Error creating user ${validatedData.username}:`, errorDetails);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            }
            throw error; // Re-throw after logging
        }
    }
}