import { AlarmType } from '@/schemas/alarm/type'

export const getAlarmColor = (alarmType: AlarmType): string => {
  switch (alarmType) {
    case AlarmType.INFO:
      return '#2196f3' // Blue
    case AlarmType.WARNING:
      return '#ff9800' // Orange
    case AlarmType.ERROR:
      return '#f44336' // Red
    case AlarmType.CRITICAL:
      return '#9c27b0' // Purple
    default:
      return '#757575' // Gray
  }
}

export const getAlarmLightTransparentColor = (alarmType: AlarmType): string => {
  switch (alarmType) {
    case AlarmType.INFO:
      return 'rgba(33, 150, 243, 0.1)'
    case AlarmType.WARNING:
      return 'rgba(255, 152, 0, 0.1)'
    case AlarmType.ERROR:
      return 'rgba(244, 67, 54, 0.1)'
    case AlarmType.CRITICAL:
      return 'rgba(156, 39, 176, 0.1)'
    default:
      return 'rgba(117, 117, 117, 0.1)'
  }
}
