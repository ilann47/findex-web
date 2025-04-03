import { ReactNode } from 'react'

import { InvertedPendulumCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { InvertedPendulumCalibration as InvertedPendulumCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentInvertedPendulumCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<InvertedPendulumCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.INVERTED_PENDULUM}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <InvertedPendulumCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <InvertedPendulumCalibration calibration={calibration} adornment={adornment} />
}
