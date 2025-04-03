import { ReactNode } from 'react'

import { ConcreteTensometerCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { ConcreteTensometerCalibration as ConcreteTensometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentConcreteTensometerCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<ConcreteTensometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.STRESS_METER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <ConcreteTensometerCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <ConcreteTensometerCalibration calibration={calibration} adornment={adornment} />
}
