import { Axios, AxiosRequestHeaders } from 'axios'

let globalHeaders: Record<string, string> = {}
let interceptorInitialized = false

export const addRequestHeaderFields = (axiosInstance: Axios, field: Record<string, string>) => {
	globalHeaders = { ...globalHeaders, ...field }

	// This prevents to have multiple interceptors
	// Every time globalHeaders is updated, the interceptor updates too
	if (!interceptorInitialized) {
		axiosInstance.interceptors.request.use(
			(config) => {
				config.headers = {
					...config.headers,
					...globalHeaders,
				} as AxiosRequestHeaders

				return config
			},
			(error) => Promise.reject(error)
		)

		interceptorInitialized = true
	}
}
