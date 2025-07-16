import { Stack } from '@mui/material'

import { Button } from '@/components/ui/inputs/button'
import { Message } from '@/types/i18n'

interface ButtonProps {
	label?: Message
	onClick?: () => void
	disabled?: boolean
	type?: 'button' | 'submit'
}

interface Props {
	primary: ButtonProps
	secondary: ButtonProps
}

export const Buttons = ({ primary, secondary }: Props) => {
	return (
		<Stack direction='row' gap={3} marginTop={3} justifyContent='right'>
			<Button
				variant='text'
				label={secondary.label ?? 'form.cancel'}
				onClick={secondary.onClick}
				fullWidth
				type={secondary.type}
				disabled={secondary.disabled}
			/>
			<Button
				variant='contained'
				label={primary.label ?? 'form.confirm'}
				onClick={primary.onClick}
				type={primary.type}
				fullWidth
				disabled={primary.disabled}
			/>
		</Stack>
	)
}
