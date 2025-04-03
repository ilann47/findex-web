import { TrashCan } from '@carbon/icons-react'
import { Button } from '@mui/material'

import { useFormatMessage } from '@/hooks/i18n/format-message'
import { theme } from '@/theme'

interface Props {
	removeFile: () => void
}

const RemoveButton = ({ removeFile }: Props) => {
	const formatMessage = useFormatMessage()

	return (
		<Button
			onClick={removeFile}
			variant='contained'
			size='small'
			startIcon={<TrashCan />}
			sx={{ background: `${theme.palette.juicy.error}` }}
			className='remove-button'
		>
			{formatMessage('actions.remove')}
		</Button>
	)
}

export default RemoveButton
