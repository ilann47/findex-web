import { ALARM_TYPES_API } from '@/constants/alarm'
import { DARK_COLOR_SUFIX, LIGHT_COLOR_SUFIX, TRANSPARENT_COLOR_SUFIX } from '@/hooks/alarm-colors'
import { AlarmType, AlarmTypeAPI } from '@/schemas/alarm/type'

export const geHigherPriorityAlarm = (alarms?: AlarmTypeAPI[]): AlarmType => {
	return ALARM_TYPES_API.find((type) => alarms?.includes(type)) || 'NORMAL'
}

export const getAlarmColor = (alarm: AlarmType) => `var(--${alarm})`

export const getAlarmLightColor = (alarm: AlarmType) => `var(--${alarm}${LIGHT_COLOR_SUFIX})`

export const getAlarmDarkColor = (alarm: AlarmType) => `var(--${alarm}${DARK_COLOR_SUFIX})`

export const getAlarmLightTransparentColor = (alarm: AlarmType) =>
	`var(--${alarm}${LIGHT_COLOR_SUFIX}${TRANSPARENT_COLOR_SUFIX})`

export const getAlarmDarkTransparentColor = (alarm: AlarmType) =>
	`var(--${alarm}${DARK_COLOR_SUFIX}${TRANSPARENT_COLOR_SUFIX})`
