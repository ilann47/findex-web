import { useQuery } from '@tanstack/react-query'

import { Service } from '@/service'
import { sarfAPI } from '@/shared/sarf'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
}

export const useGetBy = <T extends object>({ endpoint, id, enabled }: ParamsGetBy) => {
	const service = new Service<T>(sarfAPI, endpoint)

	const { data, isLoading } = useQuery({
		queryKey: [endpoint, Number(id)],
		queryFn: async () => await service.getBy(id),
		enabled: id ? enabled : false,
	})

	return { data, isLoading }
}
