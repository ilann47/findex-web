import { useCallback } from 'react'

import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import ControlledTextField from '@/components/ui/inputs/text-field'
import { useAuth } from '@/hooks/auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Credentials } from '@/schemas/auth'
import { theme } from '@/theme'

const LoginPage = () => {
	const { login } = useAuth()

	const navigate = useNavigate()

	const formatMessage = useFormatMessage()

	const form = useForm<Credentials>({
		defaultValues: { password: '', username: '' },
	})

	const loginUser = useCallback(
		async (data: Credentials) => {
			await login(
				data,
				() => {
					form.setError('username', { message: 'auth.login.feedback.wrong-credentials' })
					form.setError('password', { message: 'auth.login.feedback.wrong-credentials' })
				},
				() => {
					navigate('/')
				}
			)
		},
		[form]
	)

	return (
		<Stack
			sx={{ backgroundColor: theme.palette.juicy.neutral[90] }}
			justifyContent='center'
			alignItems='center'
			height='100vh'
		>
			<Stack
				p={3}
				gap={3}
				justifyContent='center'
				alignItems='center'
				bgcolor='#FFF'
				borderRadius={0.5}
				width={{
					xs: 400,
					md: 580,
				}}
			>
				<Typography variant='h1' sx={{ mb: 2, justifyContent: 'center', display: 'flex' }}>
					SARF
				</Typography>

				<Stack width='100%'>
					<form onSubmit={form.handleSubmit(loginUser)}>
						<Stack gap={3} mb={4}>
							<ControlledTextField
								label={formatMessage('auth.user.email')}
								control={form.control}
								name='username'
								clearable={false}
							/>
							<ControlledTextField
								label={formatMessage('auth.user.password')}
								control={form.control}
								name='password'
								type='password'
								clearable={false}
							/>
						</Stack>

						<Button type='submit' variant='contained' sx={{ width: '100%' }}>
							Entrar
						</Button>
					</form>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default LoginPage
