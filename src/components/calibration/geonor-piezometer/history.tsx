import { Stack } from '@mui/material'

import { GeonorPiezometerCalibration } from '.'
import { CalibrationMenu } from '../utils/menu'
import CalibrationHistoryLoading from '@/components/calibration/history/loading'
import CalibrationNotFoundWarning from '@/components/calibration/utils/not-found-warning'
import { StyledContainer } from '@/components/ui/container'
import { START_DATE_SORT } from '@/constants/date'
import { ENDPOINTS } from '@/constants/endpoints'
import { useCalibrationHistory } from '@/hooks/calibration-history'
import { useGetAll } from '@/hooks/get'
import { GeonorPiezometerCalibration as GeonorPiezometerCalibrationType } from '@/schemas/calibration'

interface Props {
	instrumentId: number
}

export const GeonorPiezometerCalibrationHistory = ({ instrumentId }: Props) => {
	const { data: calibrations, isLoading } = useGetAll<GeonorPiezometerCalibrationType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.GEONOR_PIEZOMETER}`,
		requestParams: { instrumentId, sort: START_DATE_SORT },
	})

	const { selectedCalibration } = useCalibrationHistory(calibrations)

	if (isLoading)
		return (
			<CalibrationHistoryLoading>
				<GeonorPiezometerCalibration isLoading showDate={false} />
			</CalibrationHistoryLoading>
		)

	if (calibrations.length === 0) return <CalibrationNotFoundWarning />

	return (
		<Stack direction='row' gap={3}>
			<CalibrationMenu calibrations={calibrations} />

			<StyledContainer height='max-content'>
				{selectedCalibration && (
					<GeonorPiezometerCalibration calibration={selectedCalibration} showDate={false} />
				)}
			</StyledContainer>
		</Stack>
	)
}
