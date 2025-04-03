import { ChartDualYAxis, ChartLine, WatsonHealthStackedScrolling_1 } from '@carbon/icons-react'
import { MenuItem, Select, Stack } from '@mui/material'

import { ChartRenderingType, useChartOptions } from '@/hooks/analysis/chart-options'
import { useFormatMessage } from '@/hooks/i18n/format-message'

const MULTIPLE: ChartRenderingType = 'multiple'
const SINGLE_MULTIPLE_Y: ChartRenderingType = 'single-multiple-y'
const SINGLE_SINGLE_Y: ChartRenderingType = 'single-single-y'

export const ChartOptionsButton = () => {
	const { changeRenderingType, renderingType } = useChartOptions()

	const formatMessage = useFormatMessage()

	return (
		<Select
			value={renderingType ?? ''}
			onChange={(e) => changeRenderingType(e.target.value as ChartRenderingType)}
			variant='standard'
			sx={{
				width: (theme) => theme.spacing(35),
			}}
		>
			<MenuItem value={MULTIPLE}>
				<Stack direction='row' alignItems='center' gap={2}>
					<WatsonHealthStackedScrolling_1 />
					{formatMessage('analysis.rendering-type.multiple')}
				</Stack>
			</MenuItem>
			<MenuItem value={SINGLE_MULTIPLE_Y}>
				<Stack direction='row' alignItems='center' gap={2}>
					<ChartDualYAxis />
					{formatMessage('analysis.rendering-type.single.multiple-y')}
				</Stack>
			</MenuItem>
			<MenuItem value={SINGLE_SINGLE_Y}>
				<Stack direction='row' alignItems='center' gap={2}>
					<ChartLine />
					{formatMessage('analysis.rendering-type.single.single-y')}
				</Stack>
			</MenuItem>
		</Select>
	)
}
