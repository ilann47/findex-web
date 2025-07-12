import { useEffect, useMemo, useRef } from 'react'

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import MouseWheelZoom from 'highcharts/modules/mouse-wheel-zoom'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display'
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting'
import { HighchartsReactRefObject } from 'highcharts-react-official'
import { useAtomValue } from 'jotai'

import { useFormatDate } from './i18n/format-date'
import { useFormatMessage } from './i18n/format-message'
import { useFormatNumber } from './i18n/format-number'
import { isSidebarCollapsedAtom } from '@/contexts/atoms/sidebar'
import { theme } from '@/theme'

HighchartsExporting(Highcharts)
HighchartsOfflineExporting(Highcharts)
NoDataToDisplay(Highcharts)
MouseWheelZoom(Highcharts)

export interface Series {
	name: string
	y: number
	color?: string
}

/**
 * Highcharts utils
 */
export const useChart = () => {
	const chartRef = useRef<HighchartsReactRefObject>(null)
	const isSidebarCollapsed = useAtomValue(isSidebarCollapsedAtom)

	const formatMessage = useFormatMessage()
	const formatNumber = useFormatNumber()
	const formatDate = useFormatDate()

	Highcharts.setOptions({
		time: {
			// useUTC não existe no tipo TimeOptions, removendo para corrigir erro TypeScript
		},
		lang: {
			months: [
				formatMessage('months.january.full'),
				formatMessage('months.february.full'),
				formatMessage('months.march.full'),
				formatMessage('months.april.full'),
				formatMessage('months.may.full'),
				formatMessage('months.june.full'),
				formatMessage('months.july.full'),
				formatMessage('months.august.full'),
				formatMessage('months.september.full'),
				formatMessage('months.october.full'),
				formatMessage('months.november.full'),
				formatMessage('months.december.full'),
			],
			shortMonths: [
				formatMessage('months.january.short'),
				formatMessage('months.february.short'),
				formatMessage('months.march.short'),
				formatMessage('months.april.short'),
				formatMessage('months.may.short'),
				formatMessage('months.june.short'),
				formatMessage('months.july.short'),
				formatMessage('months.august.short'),
				formatMessage('months.september.short'),
				formatMessage('months.october.short'),
				formatMessage('months.november.short'),
				formatMessage('months.december.short'),
			],
			weekdays: [
				formatMessage('weekdays.sunday'),
				formatMessage('weekdays.monday'),
				formatMessage('weekdays.tuesday'),
				formatMessage('weekdays.wednesday'),
				formatMessage('weekdays.thursday'),
				formatMessage('weekdays.friday'),
				formatMessage('weekdays.saturday'),
			],
			noData: formatMessage('no-data'),
		},
	})

	const exportingOptions: Highcharts.ExportingOptions = useMemo(
		() => ({
			menuItemDefinitions: {
				viewFullScreen: {
					text: formatMessage('chart.fullscreen.enter'),
					onclick: function () {
						// eslint-disable-next-line unicorn/no-this-assignment, @typescript-eslint/no-this-alias
						const chart = this

						this.fullscreen.toggle()

						document.addEventListener(
							'fullscreenchange',
							function () {
								const isFullscreen = !!document.fullscreenElement

								const newText = isFullscreen
									? formatMessage('chart.fullscreen.exit')
									: formatMessage('chart.fullscreen.enter')

								chart.update({
									exporting: {
										menuItemDefinitions: {
											viewFullScreen: {
												text: newText,
											},
										},
									},
								})
							},
							{ once: true }
						)
					},
				},
				downloadPNG: {
					text: formatMessage('chart.download-png'),
					onclick: function () {
						this.exportChart(
							{
								type: 'image/png',
							},
							{}
						)
					},
				},
				downloadSVG: {
					text: formatMessage('chart.download-svg'),
					onclick: function () {
						this.exportChart(
							{
								type: 'image/svg+xml',
							},
							{}
						)
					},
				},
				downloadJPEG: {
					text: formatMessage('chart.download-jpeg'),
					onclick: function () {
						this.exportChart(
							{
								type: 'image/jpeg',
							},
							{}
						)
					},
				},
				downloadPDF: {
					text: formatMessage('chart.download-PDF'),
					onclick: function () {
						this.exportChart(
							{
								type: 'application/pdf',
							},
							{}
						)
					},
				},
			},
			buttons: {
				contextButton: {
					menuItems: [
						'viewFullScreen',
						'separator',
						'downloadPNG',
						'downloadSVG',
						'downloadJPEG',
						'downloadPDF',
					],
					x: -10,
				},
			},
		}),
		[formatMessage]
	)

	const chartOptions: Highcharts.ChartOptions = useMemo(
		() => ({
			zooming: {
				mouseWheel: true,
				type: 'x',
			},
		}),
		[]
	)

	const titleStyleOptions = useMemo(
		() => ({
			color: theme.palette.juicy.neutral[100],
			fontFamily: 'IBM Plex Sans',
			fontWeight: '500',
		}),
		[]
	)

	const plotOptions: Highcharts.PlotOptions = useMemo(
		() => ({
			series: {
				marker: {
					symbol: 'circle',
					fillColor: '#FFFFFF',
					enabled: true,
					radius: 2.5,
					lineWidth: 1,
					lineColor: undefined,
				},
				animation: {
					duration: 1000,
				},
			},
		}),
		[]
	)

	const tooltipOptions: Highcharts.TooltipOptions = useMemo(
		() => ({
			formatter: function () {
				const formattedDate = formatDate(this.x)

				const formattedValue = this.y ? formatNumber(this.y) : this.y

				return `
				  ${formattedDate} <br/>
				  <span style="color:${this.color}">●</span> 
				  ${this.series.name}: <b>${formattedValue}</b>
				`
			},
		}),
		[formatNumber, formatDate]
	)

	const xAxisOptions: Highcharts.XAxisOptions = useMemo(
		() => ({
			type: 'datetime',
			title: {
				text: formatMessage('date'),
			},
			labels: {
				formatter: function () {
					return formatDate(this.value)
				},
			},
		}),
		[formatMessage, formatDate]
	)

	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.chart.reflow()
		}
	}, [isSidebarCollapsed])

	return {
		exportingOptions,
		chartOptions,
		chartRef,
		titleStyleOptions,
		plotOptions,
		tooltipOptions,
		xAxisOptions,
	}
}
