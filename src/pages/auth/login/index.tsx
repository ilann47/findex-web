import React, { useCallback, useState, useTransition, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    Stack,
    Typography,
    Link as MuiLink,
    Box,
    IconButton,
    InputAdornment,
    Alert, 
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import ControlledTextField from '@/components/ui/inputs/text-field';
import { useAuth } from '@/hooks/auth';
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { Credentials, LoginSchema } from '@/schemas/auth'; 
import { theme } from '@/theme';
import { isAxiosError } from 'axios';

const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';

interface LocationState {
    emailVerified?: boolean;
    emailAddress?: string;
}

const LoginPage = () => {
    const { login, email } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const formatMessage = useFormatMessage();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [loginError, setLoginError] = useState<string | null>(null); 
    const [verificationMessage, setVerificationMessage] = useState<string | null>(null); 

    const passedState = location.state as LocationState | null;

    const form = useForm<Credentials>({
        resolver: zodResolver(LoginSchema), 
        defaultValues: {
            username: passedState?.emailAddress || '', 
            password: '',
        },
        mode: 'onBlur', 
    });

    useEffect(() => {
        if (passedState?.emailVerified && passedState?.emailAddress) {
            setVerificationMessage(
                (formatMessage('auth.login.feedback.email-verified-success') + '{email}' || 'Email validated successfully for {email}. Please log in.')
                    .replace('{email}', passedState.emailAddress)
            );

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [passedState, navigate, location.pathname, formatMessage]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function isKeycloakSetupError(error: unknown): boolean {
        if (isAxiosError(error) && error.response?.data) {
            const errorData = error.response.data;
            return (
                errorData.error === 'invalid_grant' &&
                typeof errorData.error_description === 'string' &&
                errorData.error_description.includes('Account is not fully set up') 
            );
        }
        return false;
    }

    const loginUser = useCallback(
        async (data: Credentials) => {
            form.clearErrors();
            setLoginError(null); 
            setVerificationMessage(null); 

            try {
                await login(
                    data,
                    (errorDetails) => {
                         console.log("Login onFailure triggered. Error details:", errorDetails);
                        if (isKeycloakSetupError(errorDetails)) {
                            console.log("Keycloak setup error detected. Resending verification email for:", data.username);
                            email(
                                { email: data.username },
                                () => { console.error("Resend verification email failed for:", data.username); }, 
                                () => { console.log("Resend verification email request successful for:", data.username); }  
                            );

                            startTransition(() => {
                                const encodedEmail = encodeURIComponent(data.username);
                                navigate(`/email?address=${encodedEmail}`);
                            });
                        } else {
                            console.log("Credentials error or other login issue. Setting form errors.");
                            const errorMessage = formatMessage('auth.login.feedback.wrong-credentials') || 'Invalid email or password.';
                             form.setError('username', { type: 'manual' }); 
                             form.setError('password', { type: 'manual' });
                             setLoginError(errorMessage); 
                        }
                    },
                    () => {
                        console.log("Login successful. Navigating to home.");
                        startTransition(() => {
                            navigate('/'); 
                        });
                    }
                );
            } catch (error) {
                console.error("Unexpected error during login process:", error);
                setLoginError(formatMessage('error.unexpected') || 'An unexpected error occurred. Please try again.');
            }
        },
        [form, login, email, navigate, formatMessage, startTransition]
    );

    const inputBackgroundColor = theme.palette.grey[100];
    const combinedIsLoading = form.formState.isSubmitting || isPending; 

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
                    left: { md: 100, lg: 150 },
                    top: 0,
                    height: '100vh',
                    width: { md: '200px', lg: '300px', xl: '350px' }, 
                    maxWidth: '30%',
                    objectFit: 'cover',
                    zIndex: 0,
                }}
            />

            <Stack
                component="main"
                p={{ xs: 3, sm: 4, md: 5 }} 
                gap={3}
                alignItems='center'
                width={{
                    xs: '90%',
                    sm: 450,
                    md: 500,
                }}
                bgcolor={theme.palette.background.paper}
                borderRadius={2}
                zIndex={1}
            >
                <Box
                    component="img"
                    src={SARF_LOGO_PATH}
                    alt="SARF Logo"
                    sx={{
                        width: { xs: '60%', sm: 280, md: 300 }, 
                        maxWidth: '300px',
                        height: 'auto',
                        mb: 3, 
                    }}
                />

                <Typography variant="h5" component="h1" align="center" fontWeight="medium" gutterBottom>
                    {formatMessage('auth.login.title') || 'Welcome Back!'} 
                </Typography>


                {verificationMessage && (
                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                        {verificationMessage}
                    </Alert>
                )}

                 {loginError && !form.formState.isSubmitting && ( 
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {loginError}
                    </Alert>
                 )}

                {form.formState.errors.root?.unexpected && (
                     <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {form.formState.errors.root.unexpected.message}
                    </Alert>
                )}

                <Stack
                    component="form"
                    onSubmit={form.handleSubmit(loginUser)}
                    noValidate 
                    width='100%'
                    gap={2} 
                >
                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="username-input">
                            {formatMessage('auth.user.email') || 'Email'}
                        </Typography>
                        <ControlledTextField
                            id="username-input"
                            aria-label={formatMessage('auth.user.email') || 'Enter your email address'}
                            variant="outlined"
                            placeholder={formatMessage('auth.user.email') || 'your.email@example.com'}
                            control={form.control}
                            name='username' 
                            type='email'
                            autoComplete="email" 
                            clearable={false}
                            disabled={combinedIsLoading} 
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
                            placeholder={formatMessage('auth.user.password')}
                            control={form.control}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password" 
                            clearable={false}
                            disabled={combinedIsLoading} 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            disabled={combinedIsLoading} 
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
                        tabIndex={combinedIsLoading ? -1 : 0} 
                        sx={{
                            alignSelf: 'flex-end',
                            mt: 0.5,
                            mb: 2,
                            color: combinedIsLoading ? 'text.disabled' : 'primary.main',
                            pointerEvents: combinedIsLoading ? 'none' : 'auto',
                         }}
                    >
                        {formatMessage('auth.login.forgotPassword') || 'Forgot password?'}
                    </MuiLink>

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        size='large'
                        sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem', mt: 1 }} 
                        disabled={combinedIsLoading} 
                    >
                        {combinedIsLoading
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
                            tabIndex={combinedIsLoading ? -1 : 0} 
                             sx={{
                                color: combinedIsLoading ? 'text.disabled' : 'primary.main',
                                pointerEvents: combinedIsLoading ? 'none' : 'auto',
                             }}
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
                    right: { md: 100, lg: 150 },
                    top: 0,
                    height: '100vh',
                    width: { md: '200px', lg: '300px', xl: '350px' }, 
                    maxWidth: '30%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transform: 'scaleX(-1)',
                }}
            />
        </Stack>
    );
};

export default LoginPage;