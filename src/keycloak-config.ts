import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

import { KEYCLOAK_CLIENT } from './constants/auth'

const { origin, href } = window.location

export const BASE_URL = origin
export const CURR_URL = href

export const userManager = new UserManager({
	authority: import.meta.env.VITE_KEYCLOAK_URL,
	client_id: KEYCLOAK_CLIENT,
	redirect_uri: BASE_URL,
	post_logout_redirect_uri: CURR_URL,
	userStore: new WebStorageStateStore({ store: window.localStorage }),
	monitorSession: true,
	response_type: 'code',
})

export const onSigninCallback = () => {
	window.history.replaceState({}, document.title, window.location.pathname)
}
