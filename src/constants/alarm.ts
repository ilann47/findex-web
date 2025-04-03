// this must be in order of priority
export const ALARM_TYPES_API = ['SENSOR_FAILURE', 'LOW_BATTERY', 'POWER_FAILURE', 'NO_TRANSMISSION'] as const
export const ALARM_TYPES = [...ALARM_TYPES_API, 'NORMAL'] as const
