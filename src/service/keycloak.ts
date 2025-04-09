import { Credentials, OpenID } from '@/schemas/auth'
import keycloakAPI from '@/shared/keycloak'

export class KeycloakService {
	private readonly realm: string
	private readonly clientID: string

	constructor() {
		this.realm = import.meta.env.VITE_KEYCLOAK_REALM
		this.clientID = import.meta.env.VITE_KEYCLOAK_CLIENT
	}

	private async getAccessToken(params: URLSearchParams): Promise<OpenID> {
		const response = await keycloakAPI.post<OpenID>(`realms/${this.realm}/protocol/openid-connect/token`, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		return response.data
	}

	async login(credentials: Credentials): Promise<OpenID> {
		const params = new URLSearchParams({
			client_id: this.clientID,
			grant_type: 'password',
			username: credentials.username,
			password: credentials.password,
		})

		return this.getAccessToken(params)
	}

	async refreshAccessToken(refreshToken: string): Promise<OpenID> {
		const params = new URLSearchParams({
			client_id: this.clientID,
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
		})

		return this.getAccessToken(params)
	}
}
