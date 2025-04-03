import { Box, Stack } from '@mui/material'

import { Text } from '../ui/text'
import { AlarmType } from '@/schemas/alarm/type'
import { Message } from '@/types/i18n'
import { getAlarmColor, getAlarmLightTransparentColor } from '@/utils/alarm'
import { snakeToKebabCase } from '@/utils/convert-cases'

const InstrumentMapLegend = () => {
	const INSTRUMENT_LEGEND: AlarmType[] = ['SENSOR_FAILURE', 'NORMAL']

	return (
		<Stack
			gap={1}
			p={1}
			sx={{
				backgroundColor: 'rgba(255, 255, 255, 0.8)',
			}}
			borderRadius={1}
			position='absolute'
			bottom={32}
			right={16}
			zIndex={1000}
		>
			{INSTRUMENT_LEGEND.map((inst) => (
				<Stack direction='row' gap={1} key={inst} alignItems='center'>
					<Stack
						width={24}
						height={24}
						bgcolor={getAlarmLightTransparentColor(inst)}
						justifyContent='center'
						alignItems='center'
					>
						<Box width={18} height={18} bgcolor={getAlarmColor(inst)} />
					</Stack>

					<Text fontSize={12} message={`alarm.${snakeToKebabCase(inst)}` as Message} />
				</Stack>
			))}
		</Stack>
	)
}

export default InstrumentMapLegend
