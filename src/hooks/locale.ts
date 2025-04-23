import { useCallback, useEffect } from 'react'

import { useAtom } from 'jotai'

import { localeAtom } from '@/contexts/atoms/locale'
import { sarfAPI } from '@/shared/sarf'
import { Locale } from '@/types/i18n'
import { addRequestHeaderFields } from '@/utils/add-request-header-fields'

export const useLocale = () => {
	const [locale, setLocale] = useAtom(localeAtom)

	const changeLocale = useCallback((newLocale: Locale) => setLocale(newLocale), [])

	useEffect(() => {
		addRequestHeaderFields(sarfAPI, { 'Accept-Language': locale })
	}, [locale])

	return {
		locale,
		changeLocale,
	}
}
