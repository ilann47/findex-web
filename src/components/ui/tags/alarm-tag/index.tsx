import { Stack, StackProps } from '@mui/material'

import { Text } from '@/components/ui/text'
import { AlarmType, AlarmTypeAPI } from '@/schemas/alarm/type'
import { Message } from '@/types/i18n'
import { getAlarmColor, getAlarmLightTransparentColor } from '@/utils/alarm'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface AlarmTagProps extends StackProps {
	alarm: AlarmType
}

const AlarmTag = ({ alarm, ...other }: AlarmTagProps) => {
	return (
		<Stack bgcolor={getAlarmLightTransparentColor(alarm)} p={1} maxWidth={(theme) => theme.spacing(18)} {...other}>
			<Text
				color={getAlarmColor(alarm)}
				variant='caption'
				message={`alarm.${snakeToKebabCase(alarm)}` as Message}
			/>
		</Stack>
	)
}

export default AlarmTag

interface AlarmTagsProps {
	alarms: AlarmTypeAPI[]
}

export const AlarmTags = ({ alarms }: AlarmTagsProps) => {
	return (
		<Stack direction='row' gap={1} flexWrap='wrap'>
			{alarms.map((alarm) => (
				<AlarmTag key={alarm} alarm={alarm} />
			))}
			{alarms.length === 0 && <AlarmTag alarm='NORMAL' />}
		</Stack>
	)
}
