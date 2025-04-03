import { Calibration } from '@/components/calibration'
import { StyledContainer } from '@/components/ui/container'
import { useLoading } from '@/contexts/loading'
import { Calibration as CalibrationType } from '@/schemas/calibration'
import { InstrumentType } from '@/schemas/instrument'

interface Props<C> {
	instrumentType: InstrumentType
	calibration?: C
}

export const EngineeringDataDetailsCalibration = <C extends CalibrationType>({
	calibration,
	instrumentType,
}: Props<C>) => {
	const isLoading = useLoading()
	return (
		<StyledContainer>
			<Calibration calibration={calibration} instrumentType={instrumentType} isLoading={isLoading} form={false} />
		</StyledContainer>
	)
}
