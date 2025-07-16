import { CircleFill } from '@carbon/icons-react'
import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'

import { theme } from '@/theme'

interface EnabledTagProps {
	enabled: boolean
}

const EnabledTag = ({ enabled, ...other }: EnabledTagProps) => {
	const { formatMessage } = useIntl()

	return (
		<Stack
			{...other}
			direction='row'
			alignItems='center'
			justifyContent='start'
			gap={1}
			maxWidth={theme.spacing(8)}
		>
			{enabled ? formatMessage({ id: 'yes' }) : formatMessage({ id: 'no' })}
			<CircleFill color={enabled ? theme.palette.juicy.primary[60] : theme.palette.juicy.neutral[60]} />
		</Stack>
	)
}

export default EnabledTag
