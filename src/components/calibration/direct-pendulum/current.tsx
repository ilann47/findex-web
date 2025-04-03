import { ReactNode } from 'react'

import { DirectPendulumCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { DirectPendulumCalibration as DirectPendulumCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentDirectPendulumCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<DirectPendulumCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.DIRECT_PENDULUM}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <DirectPendulumCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <DirectPendulumCalibration calibration={calibration} adornment={adornment} />
}
