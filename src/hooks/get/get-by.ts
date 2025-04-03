import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useToast } from '../toast'
import { Service } from '@/service'
import { saadAPI } from '@/service/saad'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
}

export const useGetBy = <T extends object>({ endpoint, id, enabled }: ParamsGetBy) => {
	const service = new Service<T>(saadAPI, endpoint)
	const { notifyError } = useToast()

	const { data, error, isLoading } = useQuery({
		queryKey: [endpoint, Number(id)],
		queryFn: async () => await service.getBy(id),
		enabled: id ? enabled : false,
	})

	useEffect(() => {
		if (error) {
			notifyError('message.request.error')
		}
	}, [error])

	return { data, isLoading }
}
