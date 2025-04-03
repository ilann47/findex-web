import { useLayoutEffect } from 'react'

import { useGetAll } from './get'
import { ENDPOINTS } from '@/constants/endpoints'
import { AlarmColor } from '@/schemas/alarm/color'
import { AlarmType } from '@/schemas/alarm/type'
import { adjustColor } from '@/utils/adjust-color'

export const LIGHT_COLOR_SUFIX = '_LIGHT'
export const DARK_COLOR_SUFIX = '_DARK'
export const TRANSPARENT_COLOR_SUFIX = '_TRANSPARENT'
export const MARKER_ICON_CLASS = 'marker-icon'
export const MARKER_ICON_FILL_CLASS = 'marker-fill'

/**
 * Create a css variable for each alarm type color and add css rules to set colors to map markers (svg) according to its color type.
 * In Map component each marker receives a class according to its alarm type to allow that
 */
export const useAlarmColors = () => {
	const { data: alarmColors } = useGetAll<AlarmColor>({ endpoint: ENDPOINTS.ALARM_COLOR })

	useLayoutEffect(() => {
		const root = document.documentElement

		const styleSheet = document.createElement('style')
		document.head.append(styleSheet)

		alarmColors.map((alarmColor) => {
			const alarmType: AlarmType = alarmColor.alarmType ?? 'NORMAL'

			root.style.setProperty(`--${alarmType}`, alarmColor.color)

			root.style.setProperty(`--${alarmType}${LIGHT_COLOR_SUFIX}`, `${adjustColor(alarmColor.color, 80)}`)

			root.style.setProperty(`--${alarmType}${DARK_COLOR_SUFIX}`, `${adjustColor(alarmColor.color, -80)}`)

			root.style.setProperty(
				`--${alarmType}${LIGHT_COLOR_SUFIX}${TRANSPARENT_COLOR_SUFIX}`,
				`${adjustColor(alarmColor.color, 80)}48`
			)

			root.style.setProperty(
				`--${alarmType}${DARK_COLOR_SUFIX}${TRANSPARENT_COLOR_SUFIX}`,
				`${adjustColor(alarmColor.color, -80)}48`
			)

			// sets map markers colors
			const rule = `
			.marker-icon.${alarmType} .marker-fill {
				fill: var(--${alarmType}) !important;
				stroke: var(--${alarmType}${DARK_COLOR_SUFIX}) !important;
				stroke-width: 2px;
			}
		`
			styleSheet.sheet && styleSheet.sheet.insertRule(rule)
		})
	}, [alarmColors])
}
