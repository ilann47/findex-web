import { useGetJson } from '../get/get-json'
import { ENDPOINTS } from '@/constants/endpoints'
import messages from '@/messages.json'

interface MessagesFile {
	pt: Record<string, string>
	es: Record<string, string>
}

export const useI18n = () => {
	const { data } = useGetJson({ endpoint: ENDPOINTS.I18N })

	if (data) return data as unknown as MessagesFile

	return messages
}
