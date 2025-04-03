import { Group } from '@carbon/icons-react'

import z from './zod'
import { KEYCLOAK_CLIENT, ROLES } from '@/constants/auth'

const roleNameSchema = z.enum(ROLES)

export type RoleName = z.output<typeof roleNameSchema>

const keycloakTokenSchema = z.object({
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

export type KeycloakToken = z.output<typeof keycloakTokenSchema>

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
