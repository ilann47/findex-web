import { useQuery } from '@tanstack/react-query'

import { Service } from '@/service'
import { saadAPI } from '@/shared/saad'

interface ParamsGetBy {
	endpoint: string
}

export const useGetJson = <T extends object>({ endpoint }: ParamsGetBy) => {
	const service = new Service<T>(saadAPI, endpoint)

	const { data, isLoading } = useQuery({
		queryKey: [endpoint],
		queryFn: async () => {
			const response = await service.getFile('json')
			return response.data
		},
	})

	return { data, isLoading }
}
