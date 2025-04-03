import { atom } from 'jotai'

export const openPanel = atom<'periodicity' | 'instruments' | null>('periodicity')
