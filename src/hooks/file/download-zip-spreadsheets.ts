/* eslint-disable prettier/prettier */
import { useCallback, useMemo } from 'react'

import { useQueries } from '@tanstack/react-query'
import JSZip from 'jszip'

import { useAnalysisInstruments } from '../analysis/instruments'
import { useAnalysisPeriodicity } from '../analysis/periodicity'
import { useFormatMessage } from '../i18n/format-message'
import { useLoading } from '../loading'
import { ENDPOINTS } from '@/constants/endpoints'
import { Instrument } from '@/schemas/instrument'
import { Service } from '@/service'
import { saadAPI } from '@/shared/sarf'
import { DateObjectToDateString } from '@/utils/date'
import { blobToFile, downloadFile, getFile, sanitizeFilename } from '@/utils/file'

export const useDownloadEngineeringDataFromCharts = () => {
	const { startLoading, stopLoading } = useLoading()
	const { startDate, endDate, aggregateType, aggregatePeriod, reference } = useAnalysisPeriodicity()
	const { instrumentsMetaData } = useAnalysisInstruments()
	const formatMessage = useFormatMessage()

	const service = new Service(saadAPI, '')

	const { data: instruments, isLoading } = useQueries({
		queries: instrumentsMetaData.map((datum) => ({
			queryKey: [ENDPOINTS.INSTRUMENT, Number(datum.instrumentId)],
			queryFn: async () => service.getBy<Instrument>(datum.instrumentId, ENDPOINTS.INSTRUMENT),
		})),
		combine: (results) => ({
			data: results.map((result) => result.data) as Instrument[],
			isLoading: results.some((result) => result.isLoading),
		}),
	})

	const fileRequests = useMemo(() => {
		if (isLoading) return []

		return instruments?.map((inst) => ({
			endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[inst.type]}`,
			filename: formatMessage({
				id: 'instrument.engineering-value.report.title',
				values: { instrumentName: inst.name },
			}),
		}))
	}, [instruments])

	const downloadEngineeringDataFromCharts = useCallback(async () => {
		startLoading()

		try {
			const zip = new JSZip()

			const files = await Promise.all(
				fileRequests.map(async ({ endpoint, filename }) => {
					const file = await getFile(`${endpoint}/${ENDPOINTS.SPREADSHEET}`, filename, {
						date: {
							start: DateObjectToDateString(startDate),
							end: DateObjectToDateString(endDate),
						},
						aggregateType,
						aggregatePeriod,
						reference,
					})

					return file ? { name: file.name, file } : null
				})
			)

			for (const fileData of files) {
				if (fileData) zip.file(sanitizeFilename(fileData.name), fileData.file)
			}

			const zipBlob = await zip.generateAsync({ type: 'blob' })
			const zipFile = blobToFile(zipBlob, `${formatMessage('instrument.engineering-value.report.zip')}.zip`)

			downloadFile(zipFile)
		} catch (error) {
			console.error('Erro ao gerar o arquivo ZIP:', error)
		} finally {
			stopLoading()
		}
	}, [fileRequests, startDate, endDate, aggregateType, aggregatePeriod, reference, formatMessage])

	return { downloadEngineeringDataFromCharts, isLoading }
}
