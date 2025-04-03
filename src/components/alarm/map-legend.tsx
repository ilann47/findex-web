import React from 'react'

import { Box, Stack } from '@mui/material'

import { Text } from '@/components/ui/text'
import { ALARM_TYPES } from '@/constants/alarm'
import { Message } from '@/types/i18n'
import { getAlarmColor, getAlarmLightTransparentColor } from '@/utils/alarm'
import { snakeToKebabCase } from '@/utils/convert-cases'

export const AlarmMapLegend: React.FC = () => {
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
			{ALARM_TYPES.map((alarmType) => (
				<Stack direction='row' gap={1} key={alarmType} alignItems='center'>
					<Stack
						width={24}
						height={24}
						bgcolor={getAlarmLightTransparentColor(alarmType)}
						justifyContent='center'
						alignItems='center'
					>
						<Box width={18} height={18} bgcolor={getAlarmColor(alarmType)} />
					</Stack>

					<Text fontSize={12} message={`alarm.${snakeToKebabCase(alarmType)}` as Message} />
				</Stack>
			))}
		</Stack>
	)
}
