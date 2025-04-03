import { ENDPOINTS } from '../constants/endpoints'
import { InstrumentType } from '@/schemas/instrument'

export const getEngineeringDataEndpoint = (instrumentType: InstrumentType, aggregate: boolean) => {
	if (aggregate) return `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[instrumentType]}/aggregate`

	return `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[instrumentType]}`
}
