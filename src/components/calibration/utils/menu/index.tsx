import { useCallback, useEffect } from 'react'

import { ToggleButtonGroup } from '@mui/material'

import { CalibrationMenuButton } from './button'
import { StyledContainer } from '@/components/ui/container'
import { useCalibrationHistory } from '@/hooks/calibration-history'
import { Calibration } from '@/schemas/calibration'

interface Props {
	calibrations: Calibration[]
}

export const CalibrationMenu = ({ calibrations }: Props) => {
	const { calibrationId, setCalibrationId } = useCalibrationHistory()

	const handleCalibrationChange = useCallback((_e: unknown, value: number) => {
		value !== null && setCalibrationId(value)
	}, [])

	useEffect(() => {
		if (!calibrationId) {
			setCalibrationId(calibrations[0].id)
		}
	}, [calibrations])

	return (
		<StyledContainer width='40vw' height='fit-content' maxHeight='75vh' sx={{ overflowY: 'auto' }}>
			<ToggleButtonGroup
				orientation='vertical'
				exclusive
				value={Number(calibrationId)}
				onChange={handleCalibrationChange}
			>
				{calibrations.map((calibration) => (
					<CalibrationMenuButton key={calibration.id} calibration={calibration} />
				))}
			</ToggleButtonGroup>
		</StyledContainer>
	)
}
