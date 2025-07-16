import { ArrowLeft } from '@carbon/icons-react'
import { Skeleton, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { IconButton } from '@/components/ui/inputs/icon-button'
import { theme } from '@/theme'

interface Props {
	children?: string
	goBack?: true
	isLoading?: boolean
}

export const ViewLayoutHeaderTitle = ({ children, goBack, isLoading = false }: Props) => {
	const navigate = useNavigate()

	return (
		<Stack direction='row' alignItems='center' gap={1}>
			{goBack && (
				<IconButton onClick={() => navigate(-1)} disabled={isLoading} tooltip='actions.go-back'>
					<ArrowLeft size={theme.spacing(3)} />
				</IconButton>
			)}
			<Typography variant='h1'>
				{isLoading ? <Skeleton width={theme.spacing(48)} height={theme.spacing(5)} /> : children}
			</Typography>
		</Stack>
	)
}
