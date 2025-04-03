import { Skeleton, SkeletonProps } from '@mui/material'

import { StyledContainer } from '..'

const LoadingStyledContainer = ({ ...props }: SkeletonProps) => {
	return (
		<StyledContainer>
			<Skeleton variant='rectangular' {...props} />
		</StyledContainer>
	)
}

export default LoadingStyledContainer
