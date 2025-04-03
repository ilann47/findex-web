import { ReactNode } from 'react'

import { Stack, StackProps, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/inputs/button'
import { Text } from '@/components/ui/text'
import { theme } from '@/theme'
import { Message } from '@/types/i18n'

export interface WarningProps extends StackProps {
	code?: number
	titleId?: Message
	descriptionId?: Message
	icon?: ReactNode | true
	button?: boolean
}

const Warning = ({ code, titleId: title, descriptionId: description, icon, button, ...props }: WarningProps) => {
	const navigate = useNavigate()

	const handleRedirect = () => {
		navigate('/')
	}

	return (
		<Stack alignItems='center' justifyContent='center' gap={1} {...props}>
			{icon}

			{code && (
				<Typography
					variant='h1'
					sx={{
						color: theme.palette.juicy.primary[60],
						fontSize: theme.spacing(10),
						marginY: theme.spacing(4),
					}}
				>
					{code}
				</Typography>
			)}

			{title && (
				<Text
					variant='h2'
					message={title}
					sx={{ fontWeight: 'medium', fontSize: '1.5rem', textWrap: 'wrap', textAlign: 'center' }}
				/>
			)}

			{description && (
				<Text
					variant='h3'
					message={description}
					sx={{ color: theme.palette.juicy.neutral[70], fontWeight: 400, textAlign: 'center' }}
				/>
			)}

			{button && (
				<Button
					variant='contained'
					label='form.step.back'
					onClick={handleRedirect}
					sx={{ marginY: theme.spacing(4) }}
				/>
			)}
		</Stack>
	)
}

export default Warning
