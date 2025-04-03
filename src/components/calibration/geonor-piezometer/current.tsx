import { ReactNode } from 'react'

import { GeonorPiezometerCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { GeonorPiezometerCalibration as GeonorPiezometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentGeonorPiezometerCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<GeonorPiezometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.GEONOR_PIEZOMETER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <GeonorPiezometerCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <GeonorPiezometerCalibration calibration={calibration} adornment={adornment} />
}
