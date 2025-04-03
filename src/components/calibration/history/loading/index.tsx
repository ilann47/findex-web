import { PropsWithChildren } from 'react'

import { Skeleton, Stack } from '@mui/material'

import { StyledContainer } from '@/components/ui/container'

const CalibrationHistoryLoading: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack direction='row' gap={3}>
			<StyledContainer width='40vw' maxHeight='75vh' sx={{ overflowY: 'auto' }}>
				<Skeleton variant='rectangular' width='100%' height='100%' />
			</StyledContainer>
			<StyledContainer height={children ? 'content-height' : (theme) => theme.spacing(17)}>
				{children ?? <Skeleton variant='rectangular' width='100%' height='100%' />}
			</StyledContainer>
		</Stack>
	)
}

export default CalibrationHistoryLoading
