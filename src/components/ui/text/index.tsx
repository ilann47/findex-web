import { Typography, TypographyProps } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

interface Props extends TypographyProps {
	message: Message
}

export const Text = ({ message, ...props }: Props) => {
	const formatMessage = useFormatMessage()

	return <Typography {...props}>{formatMessage(message)}</Typography>
}
