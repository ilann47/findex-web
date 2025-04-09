import { useQuery } from '@tanstack/react-query'

import { GetParams, useGetAll, useGetPageable } from '.'
import { useFiltering } from '../filter/filtering'
import { KEYCLOAK_ID_CLIENT, KEYCLOAK_REALM } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { ReturnType } from '@/schemas/pageable'
import { Service } from '@/service'
import { saadAPI } from '@/shared/saad'
import { getAuthLikeFilter } from '@/utils/auth'

interface ParamsGetBy {
	endpoint: string
	enabled?: boolean
	idParam: {
		[k: string]: unknown
	}
}

export const useAuthGetOne = <T extends object>({ endpoint, enabled, idParam }: ParamsGetBy) => {
	const service = new Service<T>(saadAPI, `${ENDPOINTS.AUTH}/${endpoint}/id`)

	const { data, isLoading } = useQuery({
		queryKey: [`${ENDPOINTS.AUTH}/${endpoint}`],
		queryFn: async () =>
			await service.getOne({
				realm: KEYCLOAK_REALM,
				...idParam,
			}),
		enabled,
	})

	return { data, isLoading }
}

export const useAuthGetPageable = <T extends ReturnType>(params: GetParams) => {
	const { filters } = useFiltering()

	const parsedFilters = Object.fromEntries(
		Object.entries(filters).map(([key, value]) => [key, getAuthLikeFilter(value)])
	)

	return useGetPageable<T>({
		...params,
		endpoint: `${ENDPOINTS.AUTH}/${params.endpoint}`,
		requestParams: {
			...params.requestParams,
			realm: KEYCLOAK_REALM,
			idClient: KEYCLOAK_ID_CLIENT,
			...parsedFilters,
		},
	})
}

export const useAuthGetAll = <T extends ReturnType>(params: GetParams) => {
	return useGetAll<T>({
		...params,
		endpoint: `${ENDPOINTS.AUTH}/${params.endpoint}`,
		requestParams: {
			...params.requestParams,
			realm: KEYCLOAK_REALM,
			idClient: KEYCLOAK_ID_CLIENT,
		},
	})
}
