import { Stack, Typography } from '@mui/material'

import { Text } from '../text'

interface Props {
	selected: string[]
}

export const SelectedFiltersSummary = ({ selected }: Props) => {
	if (selected.length === 0) return null

	return (
		<Stack maxHeight={'16vh'} sx={{ overflow: 'auto' }}>
			<Text
				message={{ id: 'analysis.selected', values: { count: selected.length } }}
				color={(theme) => theme.palette.juicy.primary[60]}
				fontSize={14}
			/>
			<Typography fontSize={14} color={(theme) => theme.palette.juicy.neutral[80]}>
				{selected.join(',   ')}
			</Typography>
		</Stack>
	)
}
