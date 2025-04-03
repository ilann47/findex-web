import { Reading } from '@/components/reading'
import { StyledContainer } from '@/components/ui/container'
import { GridContainer } from '@/components/ui/container/grid'
import { Text } from '@/components/ui/text'
import { InstrumentType } from '@/schemas/instrument'
import { Reading as ReadingType } from '@/schemas/reading'

interface Props<T> {
	instrumentType: InstrumentType
	reading?: T
}

export const EngineeringDataDetailsReading = <T extends ReadingType>({ instrumentType, reading }: Props<T>) => {
	return (
		<StyledContainer>
			<Text message='instrument.readings.title.plural' variant='h2' />
			<GridContainer>
				<Reading instrumentType={instrumentType} reading={reading} />
			</GridContainer>
		</StyledContainer>
	)
}
