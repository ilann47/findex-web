import { useCallback } from 'react'

import { toast } from 'react-toastify'

import { useFormatMessage } from './i18n/format-message'
import { Message } from '@/types/i18n'

/**
 *
 * @returns {{
 *   notifySuccess: (message: Message) => void;
 *   notifyError: (message: Message) => void;
 *   notifyWarning: (message: Message) => void;
 * }}
 */
export const useToast = () => {
	const formatMessage = useFormatMessage()

	const notifySuccess = useCallback((message: Message) => {
		toast.success(formatMessage(message))
	}, [])

	const notifyError = useCallback((message: Message) => {
		toast.error(formatMessage(message))
	}, [])

	const notifyWarning = useCallback((message: Message) => {
		toast.warning(formatMessage(message))
	}, [])

	return {
		notifySuccess,
		notifyError,
		notifyWarning,
	}
}
