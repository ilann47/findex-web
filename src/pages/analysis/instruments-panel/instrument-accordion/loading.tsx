import { Accordion, Skeleton, Stack } from '@mui/material'

import { AccordionSummary } from '@/components/ui/accordion/summary'
import { IconSkeleton } from '@/components/ui/feedback/skeleton/icon'

export const InstrumentAccordionLoading = () => {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconSkeleton />}>
				<Stack direction='row' gap={3} alignItems='center' justifyContent='space-between' width='100%'>
					<Stack direction='row' gap={3} alignItems='center'>
						<Skeleton sx={{ width: (theme) => theme.spacing(10), height: (theme) => theme.spacing(4) }} />
					</Stack>
					<IconSkeleton />
				</Stack>
			</AccordionSummary>
		</Accordion>
	)
}
