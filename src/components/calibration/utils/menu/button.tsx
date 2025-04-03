import { Time } from '@carbon/icons-react'
import { ToggleButton } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Calibration } from '@/schemas/calibration'

interface CalibrationButtonProps {
	calibration: Calibration
}

export const CalibrationMenuButton = ({ calibration }: CalibrationButtonProps) => {
	const formatMessage = useFormatMessage()

	return (
		<ToggleButton key={calibration.id} value={calibration.id}>
			<Time size={24} />
			{`${calibration.startDate} - ${calibration.endDate ?? formatMessage('currently')}`}
		</ToggleButton>
	)
}
