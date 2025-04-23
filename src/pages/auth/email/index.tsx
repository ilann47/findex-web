import { useCallback, useState, useTransition, useEffect, useMemo, useRef } from 'react';
import {
    Button,
    Stack,
    Typography,
    Link as MuiLink,
    Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'; 
import { zodResolver } from '@hookform/resolvers/zod';

import ControlledTextField from '@/components/ui/inputs/text-field';
import { useAuth } from '@/hooks/auth';
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { VerificationCodeSchema, type VerificationCode } from '@/schemas/auth';
import { theme } from '@/theme';

const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';

const COOLDOWN_DURATION = 300;

const EmailPage = () => {
    const { verifyEmail, email, validateEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    const formatMessage = useFormatMessage();
    const [isPending, startTransition] = useTransition();
    const [isResendCooldown, setIsResendCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const emailAddress = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('address') ? decodeURIComponent(params.get('address') || '') : "informado!";
    }, [location.search]);

    const form = useForm<VerificationCode>({
        resolver: zodResolver(VerificationCodeSchema),
        defaultValues: { verificationCode: '' },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (form.formState.isSubmitSuccessful === false && Object.keys(form.formState.errors).length > 0) {
            setIsLoading(false);
        }
    }, [form.formState.errors, form.formState.isSubmitSuccessful]);


    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isResendCooldown && cooldownTime > 0) {
            timerRef.current = setInterval(() => {
                setCooldownTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (cooldownTime <= 0) {
            setIsResendCooldown(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isResendCooldown, cooldownTime]);

    const handleResendCode = useCallback(async () => {
        if (isResendCooldown) return;
        setIsResendCooldown(true);
        setCooldownTime(COOLDOWN_DURATION);

        try {
            form.clearErrors('root.unexpected');
            await email(
                { email: emailAddress },
                () => {
                    setIsResendCooldown(false);
                    setCooldownTime(0);
                     console.error("Resend failed for email:", emailAddress);
                     form.setError('root.unexpected', {
                         type: 'manual',
                         message: formatMessage('auth.register.email.resend-failed') || 'Failed to resend code. Please try again.'
                      });
                },
                () => {
                }
            );
        } catch (error) {
            console.error("Resend failed unexpectedly:", error);
            setIsResendCooldown(false); 
            setCooldownTime(0);
            form.setError('root.unexpected', {
                type: 'manual',
                message: formatMessage('error.unexpected') || 'An unexpected error occurred. Please try again.'
            });
        }
    }, [isResendCooldown, email, emailAddress, form, formatMessage]);

    const emailValidator = useCallback(
        async (data: VerificationCode) => {
            setIsLoading(true);
            form.clearErrors(); 

            try {
                await verifyEmail(
                    data,
                    () => {
                        form.setError('verificationCode', {
                            type: 'manual',
                            message: formatMessage('auth.register.email.invalid-code') || 'Invalid verification code.',
                        });
                        setIsLoading(false);
                    },
                    async () => { 
                        try {
                            await validateEmail(
                                { email: emailAddress },
                                () => { 
                                    console.error("Backend validation failed for email:", emailAddress);
                                    form.setError('root.unexpected', {
                                        type: 'manual',
                                        message: formatMessage('error.unexpected') || 'Could not finalize email validation. Please try again.'
                                    });
                                    setIsLoading(false);
                                },
                                () => { 
                                    startTransition(() => {
                                        navigate('/login');
                                    });
                                }
                            );
                        } catch (validationError) { 
                             console.error("validateEmail failed unexpectedly:", validationError);
                             form.setError('root.unexpected', {
                                 type: 'manual',
                                 message: formatMessage('error.unexpected') || 'An unexpected error occurred during final validation.'
                             });
                             setIsLoading(false);
                        }
                    }
                );
            } catch (error) {
                console.error("Verification failed unexpectedly:", error);
                form.setError('root.unexpected', {
                    type: 'manual',
                    message: formatMessage('error.unexpected') || 'An unexpected error occurred. Please try again.'
                });
                 setIsLoading(false);
            }
        },
        [form, verifyEmail, validateEmail, emailAddress, navigate, formatMessage, startTransition]
    );

    const inputBackgroundColor = theme.palette.grey[100];

    const combinedIsLoading = isLoading || form.formState.isSubmitting || isPending;

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
                gap={4}
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

                <Stack
                    component="form"
                    onSubmit={form.handleSubmit(emailValidator)}
                    noValidate
                    width='100%'
                    gap={3}
                >
                    <Typography variant="h5" component="h1" align='center' fontWeight="medium" gutterBottom>
                        {formatMessage('auth.register.email.info-validate-email') || 'Verify Your Email'}
                    </Typography>
                     <Typography variant="body1" align='center' color="text.secondary" sx={{ mb: 2 }}>
                        {(formatMessage('auth.register.email.info-validate-detail') || 'We sent a 6-digit code to {emailAddress}. Please enter it below.').replace('{emailAddress}', emailAddress)}
                    </Typography>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="code-input">
                            {formatMessage('auth.register.email.validate-email') || 'Verification Code'}
                        </Typography>
                        <ControlledTextField
                            id="code-input"
                            aria-label={formatMessage('auth.register.email.validate-email-code') || 'Enter your 6-digit code'}
                            variant="outlined"
                            placeholder={formatMessage('auth.register.email.validate-email-code') || 'Enter 6-digit code'}
                            control={form.control}
                            name='verificationCode'
                            type='text'
                            inputMode='numeric'
                            clearable={false}
                            inputProps={{
                                maxLength: 6,
                                autoComplete: 'one-time-code',
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: inputBackgroundColor,
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.2em',
                                    textAlign: 'left', 
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    textAlign: 'left', 
                                    opacity: 0.6,
                                    letterSpacing: 'normal', 
                                 },
                            }}
                        />
                        {form.formState.errors.root?.unexpected && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {form.formState.errors.root.unexpected.message}
                            </Typography>
                        )}
                         {form.formState.errors.verificationCode && (
                             <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                 {form.formState.errors.verificationCode.message}
                             </Typography>
                         )}
                    </Stack>

                    <Typography variant="body2" sx={{ textAlign: 'right' }}>
                        <MuiLink
                            component="button"
                            type="button"
                            onClick={handleResendCode}
                            disabled={isResendCooldown || combinedIsLoading} 
                            variant="body2"
                            underline="hover"
                            sx={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: (isResendCooldown || combinedIsLoading) ? 'default' : 'pointer',
                                color: (isResendCooldown || combinedIsLoading) ? 'text.disabled' : 'primary.main',
                                textDecoration: (isResendCooldown || combinedIsLoading) ? 'none' : 'underline',
                                '&:hover': {
                                    textDecoration: (isResendCooldown || combinedIsLoading) ? 'none' : 'underline',
                                }
                            }}
                        >
                             {isResendCooldown
                                ? (formatMessage('auth.register.email.resend-cooldown') || 'Resend code in {time}s').replace('{time}', String(cooldownTime))
                                : formatMessage('auth.register.email.resend-code') || 'Resend verification code'
                            }
                        </MuiLink>
                    </Typography>

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        size='large'
                        sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem', mt: 2 }}
                        disabled={combinedIsLoading}
                    >
                        {combinedIsLoading
                            ? (formatMessage('auth.register.email.code-in-verification') || 'Verifying...')
                            : (formatMessage('auth.register.email.code-verification') || 'Verify Code')}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                        <MuiLink
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                            fontWeight="medium"
                             sx={{
                                 pointerEvents: combinedIsLoading ? 'none' : 'auto',
                                 color: combinedIsLoading ? 'text.disabled' : 'primary.main',
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
                }}
            />
        </Stack>
    );
};

export default EmailPage;