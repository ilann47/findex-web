import { Add } from '@carbon/icons-react'
import { Accordion, AccordionDetails, Stack } from '@mui/material'
import { useAtom } from 'jotai'

import { InstrumentAccordion } from './instrument-accordion'
import { AddInstrumentsForm } from '@/components/instrument/form/add-instruments'
import { AccordionSummary } from '@/components/ui/accordion/summary'
import { IconButton } from '@/components/ui/inputs/icon-button'
import { openModal, useModal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import { openPanel } from '@/contexts/atoms/analysis'
import { useAnalysisInstruments } from '@/hooks/analysis/instruments'

export const InstrumentsPanel = () => {
	const modalRef = useModal()
	const { instrumentsMetaData } = useAnalysisInstruments()

	const [panel, setPanel] = useAtom(openPanel)

	return (
		<Accordion
			expanded={panel === 'instruments'}
			onChange={() => setPanel((curr) => (curr == 'instruments' ? null : 'instruments'))}
		>
			<AccordionSummary>
				<Text message='instrument.title.plural' variant='h2' lineHeight='unset' />

				<IconButton
					onClick={(e) => {
						e.stopPropagation()
						openModal(modalRef)()
					}}
					size='large'
					tooltip='add'
					color='primary'
				>
					<Add size={24} />
				</IconButton>
			</AccordionSummary>
			<AccordionDetails>
				<Stack gap={3}>
					{instrumentsMetaData.length > 0 && (
						<Stack maxHeight='56vh' sx={{ overflow: 'auto' }} padding={1}>
							{instrumentsMetaData.map(({ instrumentId, selectedEngineeringData }) => (
								<InstrumentAccordion
									key={instrumentId}
									id={instrumentId}
									selectedEngineeringValues={selectedEngineeringData}
								/>
							))}
						</Stack>
					)}

					<AddInstrumentsForm modalRef={modalRef} />
				</Stack>
			</AccordionDetails>
		</Accordion>
	)
}
