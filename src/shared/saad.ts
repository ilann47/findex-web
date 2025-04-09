import axios from 'axios'

export const saadAPI = axios.create({
	baseURL: import.meta.env.VITE_SAAD_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})
