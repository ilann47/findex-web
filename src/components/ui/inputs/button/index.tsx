import { Button as MuiButton, ButtonProps as MuiButtonProps, Skeleton } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

export interface ButtonProps extends MuiButtonProps {
	label: Message
	isLoading?: boolean
}

export const Button = ({ label, isLoading = false, startIcon, ...buttonProps }: ButtonProps) => {
	const formatMessage = useFormatMessage()

	if (isLoading) {
		return (
			<Skeleton
				variant='rectangular'
				sx={{ width: (theme) => theme.spacing(24), height: (theme) => theme.spacing(5) }}
			/>
		)
	}

	return (
		<MuiButton variant='outlined' size='medium' {...buttonProps} startIcon={!isLoading && startIcon}>
			{formatMessage(label)}
		</MuiButton>
	)
}
