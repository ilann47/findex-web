import { EngineeringDataChart, EngineeringDataChartType } from '@/components/engineering-data/chart'
import { useEngineeringDataChart } from '@/hooks/analysis/engineering-data-chart'

interface Props {
	type: EngineeringDataChartType
}

export const InstrumentsChart = ({ type }: Props) => {
	const { isLoading, data } = useEngineeringDataChart()

	return <EngineeringDataChart isLoading={isLoading} data={data} type={type} />
}
