import { ReactNode } from 'react'

import { ExtensometerCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { ExtensometerCalibration as ExtensometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentExtensometerCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<ExtensometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.EXTENSOMETER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <ExtensometerCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <ExtensometerCalibration calibration={calibration} adornment={adornment} />
}
