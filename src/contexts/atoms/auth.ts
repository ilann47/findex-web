import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { getUserFromToken } from '@/utils/auth'

export const ACCESS_TOKEN_KEY = 'access-token'

export const REFRESH_TOKEN_KEY = 'refresh-token'

export const TAB_FOCUSED_TIME_KEY = 'tab-focused-time'

export const accessTokenAtom = atomWithStorage<string | null>(
	ACCESS_TOKEN_KEY,
	localStorage.getItem(ACCESS_TOKEN_KEY) ?? null
)

export const refreshTokenAtom = atomWithStorage<string>(REFRESH_TOKEN_KEY, '')

export const userAtom = atom((get) => getUserFromToken(get(accessTokenAtom)))

export const tabFocusedTimeAtom = atomWithStorage(TAB_FOCUSED_TIME_KEY, 0)
