import { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFiltering } from '../filter/filtering'
import { usePagination } from '../pagination'
import { useSorting } from '../sorting'
import { ReturnType } from '@/schemas/pageable'
import { Service } from '@/service'
import { saadAPI } from '@/service/saad'

export interface GetParams {
	endpoint: string
	requestParams?: {
		[k: string]: unknown
	}
	enabled?: boolean
}

export const useGetAll = <T extends ReturnType>({ endpoint, requestParams, enabled }: GetParams) => {
	const service = new Service<T>(saadAPI, endpoint)

	const queryFn = useCallback(async () => {
		const data = await service.get({
			paged: false,
			...requestParams,
		})

		return {
			data: (data?.content || data) ?? [],
			totalElements: data?.totalElements ?? 0,
		}
	}, [requestParams, service])

	const queryKey = useMemo(() => [endpoint, requestParams], [endpoint, requestParams])

	const { data: response, ...queryReturn } = useQuery({
		queryKey,
		queryFn,
		enabled,
	})

	return {
		data: response?.data ?? [],
		totalElements: response?.totalElements ?? 0,
		...queryReturn,
	}
}

export const useGetPageable = <T extends ReturnType>({ endpoint, requestParams, ...rest }: GetParams) => {
	const { page, rowsPerPage } = usePagination()
	const { sort } = useSorting()

	const { filters } = useFiltering()

	return useGetAll<T>({
		endpoint,
		requestParams: {
			paged: true,
			page,
			size: rowsPerPage,
			...(sort && { sort }),
			...filters,
			...requestParams,
		},
		...rest,
	})
}
