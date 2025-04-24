import { Group } from '@carbon/icons-react'

import z from './zod'
import { KEYCLOAK_CLIENT, ROLES } from '@/constants/auth'

export const credentialsSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
})

export type Credentials = z.output<typeof credentialsSchema>

export const LoginSchema = credentialsSchema;
export type Login = Credentials;

const SIX_DIGIT_CODE_REGEX = /^\d{6}$/;

export const VerificationCodeSchema = z.object({
  verificationCode: z.string()
    .regex(SIX_DIGIT_CODE_REGEX, { message: 'auth.register.email.invalid-code'}),
});

export type VerificationCode = z.infer<typeof VerificationCodeSchema>;

export const emailSchema = z.object({
	email: z.string().email()
})

export type EmailSchema = z.output<typeof emailSchema>

const roleNameSchema = z.enum(ROLES)

export type RoleName = z.output<typeof roleNameSchema>

export const openIDSchema = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	refresh_expire_in: z.number(),
	refresh_token: z.string(),
	token_type: z.string(),
})

export type OpenID = z.output<typeof openIDSchema>

const accessTokenSchema = z.object({
	exp: z.number(),
	typ: z.string(),
	given_name: z.string(),
	family_name: z.string(),
	preferred_username: z.string(),
	email: z.string(),
	enabled: z.boolean(),
	sub: z.string(), // subject (whom the token refers to) -> user id
	resource_access: z.object({
		[KEYCLOAK_CLIENT]: z.object({
			roles: roleNameSchema.array(),
		}),
	}),
})

export type AccessToken = z.output<typeof accessTokenSchema>

const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	surname: z.string(),
	username: z.string(),
	email: z.string(),
	enabled: z.boolean(),
	roles: roleNameSchema.array(),
	attributes: z.record(z.string()).optional(),
})

export type User = z.output<typeof userSchema>

export const roleSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
})

export type Role = z.output<typeof roleSchema>

export const groupSchema = z.object({
	id: z.string(),
	name: z.string(),
})

export type Group = z.output<typeof groupSchema>

export const authParamsSchema = z.object({
	realm: z.string(),
	idGroup: z.string(),
	idClient: z.string(),
})

export const addRolesFormSchema = z.object({
	roles: z.array(z.string()),
	params: authParamsSchema,
})

export type AddRolesForm = z.infer<typeof addRolesFormSchema>

export const removeRolesFormSchema = authParamsSchema.extend({
	roles: z.array(z.string()),
})

export type RemoveRolesForm = z.infer<typeof removeRolesFormSchema>






export const CreateUserResponseSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
})
.passthrough()
.refine(data => data.id !== undefined || data.userId !== undefined, {
    message: "Successful user creation response should contain either 'id' or 'userId'",
});

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;


// Em schemas/auth.ts

const CredentialsSchema = z.object({
    type: z.literal('password').default('password'),
    temporary: z.boolean().default(false),         
    value: z.string().min(1, 'form.required-field-error' ).min(8, 'auth.register.passwordTooShort'), 
    confirmValue: z.string().min(1, 'form.required-field-error'),
});


export const CreateUserRequestPayloadSchema = z.object({
    params: z.object({
        realm: z.string().optional()
    }).optional(), 
                   

    username: z.string(),
    name: z.string().optional(),
    surname: z.string().optional(),
    enabled: z.boolean().default(true), 
    email: z.string().min(1, 'form.required-field-error').email('auth.register.invalid-email'),

    credentials: CredentialsSchema, 

    attributes: z.record(/*...*/)
    .nullable()
    .optional(),
});
  export type CreateUserRequestPayload = z.infer<typeof CreateUserRequestPayloadSchema>;
