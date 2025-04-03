import { DocumentExport } from '@carbon/icons-react'
import { Stack } from '@mui/material'

import { ChartOptionsButton } from './chart-options-button'
import AnalysisContent from './content'
import { InstrumentsPanel } from './instruments-panel'
import { PeriodicityPanel } from './periodicity-panel'
import { Button } from '@/components/ui/inputs/button'
import { useDownloadEngineeringDataFromCharts } from '@/hooks/file/download-zip-spreadsheets'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'

const AnalysisPage: React.FC = () => {
	const formatMessage = useFormatMessage()
	const { downloadEngineeringDataFromCharts, isLoading } = useDownloadEngineeringDataFromCharts()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('analysis.title.singular')}</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<ChartOptionsButton />
					<Button
						label='analysis.export-data'
						variant='contained'
						startIcon={<DocumentExport />}
						onClick={downloadEngineeringDataFromCharts}
						isLoading={isLoading}
					/>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
					<Stack width={{ xs: '100%', md: '24vw' }}>
						<PeriodicityPanel />

						<InstrumentsPanel />
					</Stack>

					<Stack sx={{ height: '80vh', overflowY: 'auto', width: '100%' }}>
						<AnalysisContent />
					</Stack>
				</Stack>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AnalysisPage
