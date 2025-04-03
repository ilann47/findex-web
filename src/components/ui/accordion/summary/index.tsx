import { PropsWithChildren } from 'react'

import { ChevronDown } from '@carbon/icons-react'
import { AccordionSummaryProps, AccordionSummary as MuiAccordionSummary, Stack } from '@mui/material'

export const AccordionSummary = ({ children, ...rest }: PropsWithChildren & AccordionSummaryProps) => {
	return (
		<MuiAccordionSummary
			expandIcon={<ChevronDown />}
			sx={{ flexDirection: 'row-reverse', gap: (theme) => theme.spacing(1) }}
			{...rest}
		>
			<Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
				{children}
			</Stack>
		</MuiAccordionSummary>
	)
}
