import { Skeleton } from '@mui/material'

import { GridContainer } from '@/components/ui/container/grid'
import { Field } from '@/components/ui/field'
import { INSTRUMENT_READING_VARIABLES } from '@/constants/reading-variables'
import { InstrumentType } from '@/schemas/instrument'
import { Message } from '@/types/i18n'

interface Props {
	instrumentType: InstrumentType
}

const ChannelsLoading = ({ instrumentType }: Props) => {
	return (
		<GridContainer>
			{INSTRUMENT_READING_VARIABLES[instrumentType.toString() as InstrumentType]?.map((readingVariable, i) => (
				<Field key={i} component='grid' labelId={`instrument.readings.${readingVariable}` as Message}>
					<Skeleton />
				</Field>
			))}
		</GridContainer>
	)
}

export default ChannelsLoading
