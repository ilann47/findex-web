import { ReactNode } from 'react'

import { BarometerCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { BarometerCalibration as BarometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentBarometerCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<BarometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.BAROMETER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <BarometerCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <BarometerCalibration calibration={calibration} adornment={adornment} />
}
