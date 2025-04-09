import axios from 'axios'

const keycloakAPI = axios.create({
	baseURL: import.meta.env.VITE_KEYCLOAK_URL,
})

export default keycloakAPI
