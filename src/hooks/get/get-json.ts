import { useQuery } from '@tanstack/react-query'

import { Service } from '@/service'
import { gedvAPI } from '@/shared/gedv'

interface ParamsGetBy {
	endpoint: string
}

export const useGetJson = <T extends object>({ endpoint }: ParamsGetBy) => {
	const service = new Service<T>(gedvAPI, endpoint)

	const { data, isLoading } = useQuery({
		queryKey: [endpoint],
		queryFn: async () => {
			const response = await service.getFile('json')
			return response.data
		},
	})

	return { data, isLoading }
}
