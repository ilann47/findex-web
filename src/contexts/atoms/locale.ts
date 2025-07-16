import { atomWithStorage } from 'jotai/utils'

import { Locale } from '@/types/i18n'

export const localeAtom = atomWithStorage<Locale>('locale', 'pt')
