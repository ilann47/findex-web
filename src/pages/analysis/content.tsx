import { Stack } from '@mui/material'

import { InstrumentCharts } from './chart/instrument'
import { InstrumentsChart } from './chart/instruments'
import { GridContainer } from '@/components/ui/container/grid'
import { InfoWarning } from '@/components/ui/feedback/warning/info'
import { useChartOptions } from '@/hooks/analysis/chart-options'
import { useAnalysisInstruments } from '@/hooks/analysis/instruments'

const AnalysisContent = () => {
	const { instrumentsMetaData } = useAnalysisInstruments()
	const { renderingType } = useChartOptions()

	if (
		instrumentsMetaData.length === 0 ||
		!instrumentsMetaData.some(({ selectedEngineeringData }) => selectedEngineeringData.length > 0)
	) {
		return (
			<Stack width='100%' height='80vh' justifyContent='center'>
				<InfoWarning descriptionId='analysis.no-instruments-selected' />
			</Stack>
		)
	}

	if (renderingType == 'multiple') {
		return (
			<GridContainer columns={6}>
				{instrumentsMetaData.map(({ instrumentId, selectedEngineeringData }) => (
					<InstrumentCharts
						key={instrumentId}
						instrumentId={instrumentId}
						selectedEngineeringData={selectedEngineeringData}
					/>
				))}
			</GridContainer>
		)
	}

	if (renderingType == 'single-multiple-y') {
		return <InstrumentsChart type='multiple-y' />
	}

	if (renderingType == 'single-single-y') {
		return <InstrumentsChart type='single-y' />
	}
}

export default AnalysisContent
