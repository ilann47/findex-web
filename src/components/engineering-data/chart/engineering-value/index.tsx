import { Grid, Skeleton } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { useChart } from '@/hooks/chart'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useFormatNumber } from '@/hooks/i18n/format-number'
import { Message } from '@/types/i18n'
import { camelToKebabCase } from '@/utils/convert-cases'
import { DateStringToDateObject } from '@/utils/date'
import { formatEngineeringValue } from '@/utils/format-engineering-value'

interface Props {
	engineeringValueName: string
	instrumentName: string
	engineeringValues: {
		value: number
		date: string
	}[]
	isLoading: boolean
}

export const EngineeringValueChart = ({
	engineeringValues,
	engineeringValueName,
	instrumentName,
	isLoading,
}: Props) => {
	const formatMessage = useFormatMessage()
	const formatNumber = useFormatNumber()

	const { exportingOptions, chartOptions, titleStyleOptions, plotOptions, tooltipOptions, xAxisOptions } = useChart()

	const name = formatEngineeringValue(
		formatMessage(`instrument.engineering-value.${camelToKebabCase(engineeringValueName)}.name` as Message),
		formatMessage(`instrument.engineering-value.${camelToKebabCase(engineeringValueName)}.uom` as Message)
	)

	const options: Highcharts.Options = {
		chart: chartOptions,
		exporting: exportingOptions,
		plotOptions,
		tooltip: tooltipOptions,

		title: {
			text: `${instrumentName} - ${name}`,
			style: titleStyleOptions,
		},

		legend: {
			enabled: false,
		},

		xAxis: xAxisOptions,

		yAxis: {
			title: {
				text: formatMessage('values'),
			},
			labels: {
				formatter: function () {
					return formatNumber(this.value as number)
				},
			},
		},

		series: [
			{
				name,
				type: 'line',
				data: engineeringValues.map((engineeringValue) => [
					DateStringToDateObject(engineeringValue.date)?.getTime(),
					engineeringValue.value,
				]),
			},
		],
	}

	if (isLoading)
		return (
			<Grid item xs={6} lg={3} xl={2}>
				<Skeleton variant='rectangular' width='100%' height={400} />
			</Grid>
		)

	return (
		<Grid item xs={6} lg={3} xl={2}>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</Grid>
	)
}
