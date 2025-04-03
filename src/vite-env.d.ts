/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
	readonly VITE_APP_VERSION: string
	readonly VITE_SAAD_API_URL: string

	readonly VITE_KEYCLOAK_URL: string
	readonly VITE_KEYCLOAK_REALM: string
	readonly VITE_KEYCLOAK_CLIENT: string
	readonly VITE_KEYCLOAK_ID_CLIENT: string
	readonly VITE_KEYCLOAK_CLIENT_ACCESS_GROUP: string
	readonly VITE_KEYCLOAK_GROUP_PREFIX: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
