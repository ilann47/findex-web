import { AxiosInstance, AxiosResponse, ResponseType } from 'axios'
import qs from 'qs'

import { Pageable, ReturnType } from '@/schemas/pageable'

export interface RequestParams {
	[k: string]: unknown
}

export type updateMethod = 'patch' | 'put'

const paramsSerializer = (params: Record<string, unknown>) => {
	return qs.stringify(params, { encode: false, allowDots: true, arrayFormat: 'comma' })
}

export class Service<T extends ReturnType> {
	constructor(
		private axiosInstance: AxiosInstance,
		private endpoint: string
	) {}

	async get<P extends ReturnType = T>(params: RequestParams, endpoint?: string): Promise<Pageable<P>> {
		const response = await this.axiosInstance.get<Pageable<P>>(`/${endpoint ?? this.endpoint}`, {
			params,
			paramsSerializer,
		})

		return response.data
	}

	async create<P extends ReturnType = T>(body?: P, endpoint?: string): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.post<T>(`/${endpoint ?? this.endpoint}`, body)
	}

	async update<P extends ReturnType = T>(id: number | string, body: P, endpoint?: string): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.put<T>(endpoint ?? `${this.endpoint}/${id}`, body)
	}

	async patch<P extends ReturnType = T>(body?: P, endpoint?: string): Promise<AxiosResponse<T>> {
		return await this.axiosInstance.patch<T>(endpoint ?? this.endpoint, body)
	}

	async getBy<P extends ReturnType = T>(id: number | string, endpoint?: string): Promise<P> {
		const response = await this.axiosInstance.get<P>(`/${endpoint ?? this.endpoint}/${id}`)

		return response.data
	}

	async getOne<P extends ReturnType = T>(params: RequestParams, endpoint?: string): Promise<P> {
		const response = await this.axiosInstance.get<P>(`/${endpoint ?? this.endpoint}`, {
			params,
			paramsSerializer,
		})

		return response.data
	}

	async delete(id?: number | string, endpoint?: string, params?: RequestParams): Promise<void> {
		await this.axiosInstance.delete(endpoint ?? (id ? `/${this.endpoint}/${id}` : `/${this.endpoint}`), {
			params,
			paramsSerializer,
		})
	}

	async sendFile(body: FormData, params?: RequestParams, endpoint?: string): Promise<Blob> {
		const result = await this.axiosInstance.post<Blob>(endpoint ?? `/${this.endpoint}`, body, {
			responseType: 'blob',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			params,
		})

		return result.data
	}

	async getFile(responseType?: ResponseType, params?: RequestParams, endpoint?: string) {
		const response = await this.axiosInstance.get(endpoint ?? `/${this.endpoint}`, {
			params,
			paramsSerializer,
			responseType: responseType ?? 'blob',
		})
		return { data: response.data as Blob, headers: response.headers }
	}
}
