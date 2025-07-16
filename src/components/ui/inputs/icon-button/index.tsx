import { IconButtonProps, IconButton as MuiIconButton, Tooltip } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

interface Props {
	tooltip?: Message
}

export const IconButton = ({ tooltip, children, ...props }: Props & IconButtonProps) => {
	const formatMessage = useFormatMessage()

	return tooltip ? (
		<Tooltip title={formatMessage(tooltip)}>
			<MuiIconButton {...props}>{children}</MuiIconButton>
		</Tooltip>
	) : (
		<MuiIconButton {...props}>{children}</MuiIconButton>
	)
}
