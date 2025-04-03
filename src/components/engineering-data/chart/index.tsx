import { useCallback, useMemo } from 'react'

import { Grid, Skeleton } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { GridContainer } from '@/components/ui/container/grid'
import { useChart } from '@/hooks/chart'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useFormatNumber } from '@/hooks/i18n/format-number'
import { Instrument } from '@/schemas/instrument'
import { GenericEngineeringData } from '@/types/generic-engineering-data'
import { Message } from '@/types/i18n'
import { camelToKebabCase } from '@/utils/convert-cases'
import { DateStringToDateObject } from '@/utils/date'
import { formatEngineeringValue } from '@/utils/format-engineering-value'

export type EngineeringDataChartType = 'multiple-y' | 'single-y'

interface Props {
	isLoading: boolean
	data: {
		instrument: Instrument
		engineeringValueName: string
		engineeringData: GenericEngineeringData[]
	}[]
	type: EngineeringDataChartType
}

export const EngineeringDataChart = ({ isLoading, data, type }: Props) => {
	const formatMessage = useFormatMessage()
	const formatNumber = useFormatNumber()

	const { exportingOptions, chartOptions, chartRef, titleStyleOptions, plotOptions, tooltipOptions, xAxisOptions } =
		useChart()

	const getSeriesName = useCallback(
		(instrumentName: string, engineeringValueName: string) => {
			const translatedEngineeringValueName = formatEngineeringValue(
				formatMessage(`instrument.engineering-value.${camelToKebabCase(engineeringValueName)}.name` as Message),
				formatMessage(`instrument.engineering-value.${camelToKebabCase(engineeringValueName)}.uom` as Message)
			)

			return `${instrumentName} - ${translatedEngineeringValueName}`
		},
		[formatMessage]
	)

	const multipleYAxisOptions: Highcharts.YAxisOptions[] = useMemo(
		() =>
			data.map((datum, index) => {
				const color = Highcharts.getOptions().colors![index] as string

				return {
					title: {
						text: getSeriesName(datum.instrument?.name ?? '', datum.engineeringValueName),
						style: { color },
					},
					labels: {
						style: { color },
						formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
							return formatNumber(this.value as number)
						},
					},
					opposite: index % 2 !== 0,
				}
			}),
		[data, formatNumber]
	)

	const singleYAxisOptions: Highcharts.YAxisOptions = useMemo(
		() => ({
			title: {
				text: formatMessage('values'),
			},
			labels: {
				formatter: function () {
					return formatNumber(this.value as number)
				},
			},
		}),
		[formatMessage, formatNumber]
	)

	const options: Highcharts.Options = {
		exporting: exportingOptions,
		plotOptions,
		tooltip: tooltipOptions,

		chart: {
			...chartOptions,
			width: null,
			height: '48%',
		},

		title: {
			text: formatMessage('instrument.engineering-value.title.plural'),
			style: titleStyleOptions,
		},

		xAxis: xAxisOptions,

		yAxis: type == 'multiple-y' ? multipleYAxisOptions : singleYAxisOptions,

		series: data.map((datum, index) => ({
			name: getSeriesName(datum.instrument?.name ?? '', datum.engineeringValueName),
			type: 'line',
			data: datum.engineeringData.map((engineeringValue) => [
				DateStringToDateObject(engineeringValue.date)?.getTime(),
				engineeringValue[datum.engineeringValueName] as number,
			]),
			yAxis: type == 'multiple-y' ? index : undefined,
		})),
	}

	if (isLoading) return <Skeleton variant='rectangular' width='100%' height='100%' />

	return (
		<GridContainer>
			<Grid item xs={5} display='grid'>
				<HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
			</Grid>
		</GridContainer>
	)
}
