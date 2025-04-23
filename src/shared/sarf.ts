import axios from 'axios'

export const sarfAPI = axios.create({
	baseURL: import.meta.env.VITE_SARF_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})


export const sarfAPIwithoutHeader = axios.create({
	baseURL: import.meta.env.VITE_SARF_API_URL,

})
