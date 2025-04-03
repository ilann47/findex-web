import { ReactNode } from 'react'

import { ElectricJointMeterCalibration } from '.'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetPageable } from '@/hooks/get'
import { ElectricJointMeterCalibration as ElectricJointMeterCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
	adornment?: ReactNode
}

export const CurrentElectricJointMeterCalibration = ({ instrumentId, adornment }: Props) => {
	const {
		data: [calibration],
		isLoading,
	} = useGetPageable<ElectricJointMeterCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.ELECTRIC_JOINT_METER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT, size: 1 },
	})

	if (isLoading) return <ElectricJointMeterCalibration isLoading />

	if (!calibration) return <CalibrationNotFoundWarning />

	return <ElectricJointMeterCalibration calibration={calibration} adornment={adornment} />
}
