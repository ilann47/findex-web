import { ReactNode } from 'react'

import { StandpipePiezometerCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { StandpipePiezometerCalibration as StandpipePiezometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentStandpipePiezometerCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<StandpipePiezometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.STANDPIPE_PIEZOMETER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <StandpipePiezometerCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <StandpipePiezometerCalibration calibration={calibration} adornment={adornment} />
}
