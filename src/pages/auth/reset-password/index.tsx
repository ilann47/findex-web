import React, { useCallback, useState, useTransition, useEffect, useMemo } from 'react';
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
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import ControlledTextField from '@/components/ui/inputs/text-field';
import { useAuth } from '@/hooks/auth'; 
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { theme } from '@/theme';
import { ResetPassword, resetPasswordSchema } from '@/schemas/auth';


const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';


const ResetPasswordPage = () => {
    const { resetPassword } = useAuth(); 
    const navigate = useNavigate();
    const formatMessage = useFormatMessage();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<ResetPassword>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onBlur',
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
    const handleMouseDownPasswordConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const emailAddress = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('address') ? decodeURIComponent(params.get('address') || '') : "informado!";
    }, [location.search]);

    const handleResetPasswordSubmit = useCallback(
        async (data: ResetPassword) => {
            form.clearErrors();
            setSubmitError(null);
            setSuccessMessage(null);
            if (data.password !== data.confirmPassword) {
                form.setError('confirmPassword', {
                   type: 'manual',
                   message: formatMessage('auth.register.feedback.wrong-credentials'),
               });
               return; 
           }
           setIsLoading(true);

            startTransition(() => {
                 resetPassword(
                    {email: emailAddress},
                    data,
                    (errorDetails) => {
                        console.error("Password reset failed:", errorDetails);
                        setSubmitError(formatMessage('auth.reset-password.feedback.failure') );
                        setIsLoading(false);
                    },
                    () => {
                        console.log("Password reset successful.");
                        setSuccessMessage(formatMessage('auth.reset-password.feedback.success'));
                        form.reset(); 
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 3000); 
                    }
                 ).catch((error) => {
                    console.error("Unexpected error during password reset:", error);
                    setSubmitError(formatMessage('error.unexpected') || 'An unexpected error occurred. Please try again.');
                 });
            });
        },
        [form, resetPassword, formatMessage, startTransition, navigate, emailAddress]
    );

    const inputBackgroundColor = theme.palette.grey[100];
    const combinedIsLoading = form.formState.isSubmitting || isPending;
    const isFormDisabled = combinedIsLoading || !!successMessage || isLoading ; 

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

                <Typography variant="h5" component="h1" align="center" fontWeight="medium">
                    {formatMessage('auth.reset-password.title')}
                </Typography>


                {successMessage && (
                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                 {submitError && !form.formState.isSubmitting && !successMessage  && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {submitError}
                    </Alert>
                 )}

                {form.formState.errors.root?.unexpected && !successMessage  && (
                     <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {form.formState.errors.root.unexpected.message}
                    </Alert>
                )}


                {!successMessage && (
                    <Stack
                        component="form"
                        onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
                        noValidate
                        width='100%'
                        gap={2}
                    >
                        <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight="medium" component="label" htmlFor="password-input">
                                {formatMessage('auth.reset-password.new-password')}
                            </Typography>
                            <ControlledTextField
                                id="password-input"
                                variant="outlined"
                                placeholder={formatMessage('auth.reset-password.new-password') }
                                control={form.control}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                clearable={false}
                                disabled={isFormDisabled}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                disabled={isFormDisabled}
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

                        <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight="medium" component="label" htmlFor="password-confirmation-input">
                                {formatMessage('auth.reset-password.confirm-new-password') || 'Confirm New Password'}
                            </Typography>
                            <ControlledTextField
                                id="password-confirmation-input"
                                variant="outlined"
                                placeholder={formatMessage('auth.reset-password.confirm-new-password') || 'Confirm your new password'}
                                control={form.control}
                                name='confirmPassword'
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                autoComplete="new-password"
                                clearable={false}
                                disabled={isFormDisabled}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPasswordConfirmation}
                                                onMouseDown={handleMouseDownPasswordConfirmation}
                                                edge="end"
                                                disabled={isFormDisabled}
                                            >
                                                {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
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

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            size='large'
                            sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem', mt: 3, mb: 2 }}
                            disabled={isFormDisabled} 
                        >
                            {combinedIsLoading || isLoading
                                ? (formatMessage('auth.reset-password.loading'))
                                : (formatMessage('auth.reset-password.reset'))}
                        </Button>
                    </Stack>
                 )}

                 {(successMessage) && (
                     <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                        <MuiLink
                            component={RouterLink}
                            to="/login" 
                            underline="hover"
                            fontWeight="medium"
                             sx={{
                                color: 'primary.main', 
                             }}
                        >
                            {formatMessage('form.step.back')}
                        </MuiLink>
                    </Typography>
                 )}

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

export default ResetPasswordPage;