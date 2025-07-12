export enum AlarmType {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  CRITICAL = 'critical',
}

export interface AlarmTypeAPI {
  id: string
  type: AlarmType
  message: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high' | 'critical'
}
