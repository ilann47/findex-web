import { useCallback, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	Stack,
	Typography,
	Link as MuiLink,
	Box,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ControlledTextField from '@/components/ui/inputs/text-field';
import { useAuth } from '@/hooks/auth';
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { Credentials } from '@/schemas/auth';
import { theme } from '@/theme';

const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg'; 

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const formatMessage = useFormatMessage();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<Credentials>({
		defaultValues: { password: '', username: '' },
	});

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const loginUser = useCallback(
		async (data: Credentials) => {
			try {
				await login(
					data,
					() => {
						form.setError('username', {
							type: 'manual',
							message: formatMessage('auth.login.feedback.wrong-credentials') || 'Invalid credentials',
						});
						form.setError('password', {
							type: 'manual',
							message: formatMessage('auth.login.feedback.wrong-credentials') || 'Invalid credentials',
						});
					},
					() => {
						navigate('/');
					}
				);
			} catch (error) {
				console.error("Login failed unexpectedly:", error);
				form.setError('root.unexpected', { type: 'manual', message: 'An unexpected error occurred.' });
			}
		},
		[form, login, navigate, formatMessage]
	);

	const inputBackgroundColor = theme.palette.grey[100]; 

	return (
		<Stack
			sx={{
				backgroundColor: theme.palette.juicy.neutral[10], 
				minHeight: '100vh',
				position: 'relative', 
				overflow: 'hidden',
			}}
			justifyContent='center' 
			alignItems='center' 
		>
			<Box
				component="img"
				src={LEFT_DECORATION_PATH}
				alt="" 
				sx={{
					display: { xs: 'none', md: 'block' },
					position: 'absolute',
					left: 150,
					top: 0,
					height: '100vh',
					width: { md: '250px', lg: '350px' },
					maxWidth: '30%',
					objectFit: 'cover',
					zIndex: 0,
				}}
			/>

			<Stack
				component="main"
				p={{ xs: 3, md: 5 }}
				gap={3}
				alignItems='center'
				width={{
					xs: '90%',
					sm: 450,
					md: 500,
				}}
				bgcolor={theme.palette.juicy.neutral[10]} 
				borderRadius={2}
				zIndex={1} // Ensure form is above images
			>
				{/* Logo */}
				<Box
					component="img"
					src={SARF_LOGO_PATH}
					alt="SARF Logo"
					sx={{
						width: { xs: '70%', sm: 300, md: 320 }, 
						maxWidth: '320px', 
						height: 'auto',
						mb: 4, 
					}}
				/>

				<Stack
					component="form"
					onSubmit={form.handleSubmit(loginUser)}
					width='100%'
					gap={2.5}
				>
					<Stack spacing={0.5}>
						<Typography variant="body2" fontWeight="medium" component="label" htmlFor="username-input">
							{formatMessage('auth.user.email') || 'Email'}
						</Typography>
						<ControlledTextField
							id="username-input"
							variant="outlined"
							placeholder={formatMessage('auth.user.email') || 'Enter your email'}
							control={form.control}
							name='username'
							type='email'
							clearable={false}
							sx={{ 
								'& .MuiOutlinedInput-root': {
									backgroundColor: inputBackgroundColor,
								},
							}}
						/>
					</Stack>

					<Stack spacing={0.5}>
						<Typography variant="body2" fontWeight="medium" component="label" htmlFor="password-input">
							{formatMessage('auth.user.password') || 'Password'}
						</Typography>
						<ControlledTextField
							id="password-input"
							variant="outlined"
							placeholder={formatMessage('auth.user.password') || 'Enter your password'}
							control={form.control}
							name='password'
							type={showPassword ? 'text' : 'password'}
							clearable={false}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{ 
								'& .MuiOutlinedInput-root': {
									backgroundColor: inputBackgroundColor,
								},
							}}
						/>
					</Stack>

					<MuiLink
						component={RouterLink}
						to="/forgot-password"
						variant="body2"
						underline="hover"
						sx={{ alignSelf: 'flex-end', mt: 1, mb: 2 }}
					>
						{formatMessage('auth.login.forgotPassword') || 'Forgot password?'}
					</MuiLink>

					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						size='large'
						sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting
							? (formatMessage('auth.login.loading') || 'Logging in...')
							: (formatMessage('auth.login.button') || 'Login')}
					</Button>

					<Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
						{formatMessage('auth.login.noAccount') || "Don't have an account?"}{' '}
						<MuiLink
							component={RouterLink}
							to="/register"
							underline="hover"
							fontWeight="medium"
						>
							{formatMessage('auth.login.registerNow') || 'Register now'}
						</MuiLink>
					</Typography>
				</Stack>
			</Stack>

			<Box
				component="img"
				src={RIGHT_DECORATION_PATH} 
				alt="" 
				sx={{
					display: { xs: 'none', md: 'block' },
					position: 'absolute',
					right: 150, 
					top: 0,
					height: '100vh',
					width: { md: '250px', lg: '350px' },
					maxWidth: '30%',
					objectFit: 'cover',
					zIndex: 0,
				}}
			/>
		</Stack>
	);
};

export default LoginPage;