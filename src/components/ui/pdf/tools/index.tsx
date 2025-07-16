import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import { Stack, Typography } from '@mui/material'

import { IconButton } from '../../inputs/icon-button'

interface Props {
	page: number
	goBack: () => void
	goNext: () => void
	total: number
}

const Tools: React.FC<Props> = ({ page, total, goBack, goNext }) => {
	return (
		<Stack className='tools' bgcolor='#282828EE' borderRadius={1} direction='row' alignItems='center'>
			<IconButton disabled={page === 1} onClick={goBack} color='info' tooltip='actions.previous'>
				<ChevronLeft size={24} />
			</IconButton>
			<Typography fontSize={14} color={(theme) => theme.palette.juicy.neutral[10]}>
				{page} de {total}
			</Typography>
			<IconButton disabled={page === total} onClick={goNext} color='info' tooltip='actions.next'>
				<ChevronRight size={24} />
			</IconButton>
		</Stack>
	)
}

export default Tools
