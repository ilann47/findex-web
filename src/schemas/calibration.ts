import { z } from 'zod'

export const calibrationSchema = z.object({
  id: z.string().optional(),
  deviceId: z.string(),
  timestamp: z.date(),
  value: z.number(),
  unit: z.string(),
  status: z.enum(['pending', 'completed', 'failed']),
})

export type Calibration = z.infer<typeof calibrationSchema>
