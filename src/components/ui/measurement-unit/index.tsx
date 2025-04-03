import { Typography } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

interface Props {
	message: Message
}

// acronym -> UoM
export const UnitOfMeasure = ({ message }: Props) => {
	const formatMessage = useFormatMessage()

	return (
		<Typography component='span' ml={1} color={(theme) => theme.palette.juicy.neutral[70]}>
			({formatMessage(message)})
		</Typography>
	)
}
