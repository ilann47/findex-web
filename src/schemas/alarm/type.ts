import z from '../zod'
import { ALARM_TYPES, ALARM_TYPES_API } from '@/constants/alarm'

export const alarmTypeApiSchema = z.enum(ALARM_TYPES_API)
export const alarmTypeSchema = z.enum(ALARM_TYPES)

export type AlarmTypeAPI = z.output<typeof alarmTypeApiSchema>
export type AlarmType = z.output<typeof alarmTypeSchema>
