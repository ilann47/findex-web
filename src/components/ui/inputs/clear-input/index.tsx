import { Close } from '@carbon/icons-react'
import { InputAdornment, InputAdornmentProps } from '@mui/material'

import { IconButton } from '../icon-button'

interface Props extends Omit<InputAdornmentProps, 'position'> {
	onClick: () => void
}

export const ClearInput = ({ onClick, ...props }: Props) => {
	return (
		<InputAdornment position='end' sx={{ mr: 0.5 }} {...props}>
			<IconButton onClick={onClick} edge='end'>
				<Close />
			</IconButton>
		</InputAdornment>
	)
}
