import { TrashCan } from '@carbon/icons-react'
import { Accordion, AccordionDetails, Stack } from '@mui/material'

import { InstrumentAccordionLoading } from './loading'
import { AccordionSummary } from '@/components/ui/accordion/summary'
import Checkbox from '@/components/ui/inputs/checkbox'
import { IconButton } from '@/components/ui/inputs/icon-button'
import { UnitOfMeasure } from '@/components/ui/measurement-unit'
import { ENDPOINTS } from '@/constants/endpoints'
import { INSTRUMENT_ENGINEERING_DATA } from '@/constants/engineering-data'
import { useAnalysisInstruments } from '@/hooks/analysis/instruments'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'
import { camelToKebabCase } from '@/utils/convert-cases'

interface Props {
	id: number
	selectedEngineeringValues: string[]
}

export const InstrumentAccordion = ({ id, selectedEngineeringValues }: Props) => {
	const { data: instrument, isLoading } = useGetBy<Instrument>({ endpoint: ENDPOINTS.INSTRUMENT, id })
	const { handleEngineeringValueClick, removeInstrument } = useAnalysisInstruments()
	const formatMessage = useFormatMessage()

	if (isLoading) return <InstrumentAccordionLoading />

	if (!instrument) return null

	return (
		<Accordion>
			<AccordionSummary>
				{instrument.name}

				<IconButton
					onClick={(e) => {
						e.stopPropagation()
						removeInstrument(id)
					}}
					tooltip='actions.remove'
				>
					<TrashCan />
				</IconButton>
			</AccordionSummary>
			<AccordionDetails>
				{INSTRUMENT_ENGINEERING_DATA[instrument.type].map((engineeringValue) => (
					<Stack key={engineeringValue} direction='row' alignItems='center' justifyContent='space-between'>
						<Checkbox
							label={formatMessage(
								`instrument.engineering-value.${camelToKebabCase(engineeringValue)}.name` as Message
							)}
							checked={selectedEngineeringValues.includes(engineeringValue)}
							onChange={() => handleEngineeringValueClick(id, engineeringValue)}
						/>
						<UnitOfMeasure
							message={
								`instrument.engineering-value.${camelToKebabCase(engineeringValue)}.uom` as Message
							}
						/>
					</Stack>
				))}
			</AccordionDetails>
		</Accordion>
	)
}
