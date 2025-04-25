import React, { useCallback, useState, useTransition } from 'react';
import {
    Button,
    Stack,
    Typography,
    Link as MuiLink,
    Box,
    Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import ControlledTextField from '@/components/ui/inputs/text-field';
import { useAuth } from '@/hooks/auth';
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { theme } from '@/theme';
import { emailSchema, EmailSchema } from '@/schemas/auth';

const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';

const ForgotPasswordPage = () => {
    const { email } = useAuth(); 
    const navigate = useNavigate();
    const formatMessage = useFormatMessage();
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onBlur',
    });

    const handleForgotPasswordSubmit = useCallback(
        async (data: EmailSchema) => {
            form.clearErrors();
            setSubmitError(null);
            setSuccessMessage(null);

            try {
                await email(
                    { email: data.email },
                    () => {},
                    () => {}
                    );

                    startTransition(() => {
                        const encodedEmail = encodeURIComponent(data.email);
                        navigate(`/email-reset-password?address=${encodedEmail}`);
                }
                );

                      
            } catch (error) {
                console.error("Unexpected error during login process:", error);
            }
        },
        [form, email, formatMessage, startTransition] 
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

                <Typography variant="h5" component="h1" align="center" fontWeight="medium">
                    {formatMessage('auth.login.forgotPassword.title')}
                </Typography>
                 <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
                    {formatMessage('auth.login.forgotPassword.subtitle')}
                </Typography>

                {successMessage && (
                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                 {submitError && !form.formState.isSubmitting && !successMessage && ( 
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {submitError}
                    </Alert>
                 )}

                {form.formState.errors.root?.unexpected && !successMessage && (
                     <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {form.formState.errors.root.unexpected.message}
                    </Alert>
                )}

                <Stack
                    component="form"
                    onSubmit={form.handleSubmit(handleForgotPasswordSubmit)}
                    noValidate
                    width='100%'
                    gap={2}
                >
                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="email-input">
                            {formatMessage('auth.user.email') || 'Email'}
                        </Typography>
                        <ControlledTextField
                            id="email-input"
                            aria-label={formatMessage('auth.user.email') || 'Enter your email address'}
                            variant="outlined"
                            placeholder={formatMessage('auth.user.email') || 'your.email@example.com'}
                            control={form.control}
                            name='email' 
                            type='email'
                            autoComplete="email"
                            clearable={false} 
                            disabled={combinedIsLoading || !!successMessage} 
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
                        disabled={combinedIsLoading || !!successMessage} 
                    >
                        {combinedIsLoading
                            ? (formatMessage('auth.login.forgotPassword.loading') )
                            : (formatMessage('auth.login.forgotPassword.button'))}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                        <MuiLink
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                            fontWeight="medium"
                            tabIndex={combinedIsLoading ? -1 : 0}
                             sx={{
                                color: combinedIsLoading ? 'text.disabled' : 'primary.main',
                                pointerEvents: combinedIsLoading ? 'none' : 'auto',
                             }}
                        >
                            {formatMessage('form.step.back') || 'Back to Login'}
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

export default ForgotPasswordPage;