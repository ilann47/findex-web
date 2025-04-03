import { Grid } from '@mui/material'

import { AlarmColor } from './alarm-color'
import { GridContainer } from '@/components/ui/container/grid'
import { ALARM_TYPES } from '@/constants/alarm'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { AlarmColor as AlarmColorType } from '@/schemas/alarm/color'

export const AlarmColors = () => {
	const { data: alarmColors } = useGetAll<AlarmColorType>({ endpoint: ENDPOINTS.ALARM_COLOR })

	return (
		<GridContainer spacing={6}>
			{ALARM_TYPES.map((type) => {
				const alarmColor = alarmColors.find((color) => color.alarmType == (type == 'NORMAL' ? null : type))

				if (alarmColor) {
					return (
						<Grid key={type} item xs={5} sm={2.5} lg={1.25} xl={1}>
							<AlarmColor alarmColor={alarmColor} alarmType={type} />
						</Grid>
					)
				}
			})}
		</GridContainer>
	)
}
