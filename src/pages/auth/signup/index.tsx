import { useCallback, useState, useTransition } from 'react';

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
import { zodResolver } from '@hookform/resolvers/zod'; 

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ControlledTextField from '@/components/ui/inputs/text-field'; 
import { useAuth } from '@/hooks/auth'; 
import { useFormatMessage } from '@/hooks/i18n/format-message'; 

import {CreateUserRequestPayloadSchema, CreateUserRequestPayload} from '@/schemas/auth';

import { theme } from '@/theme';
const SARF_LOGO_PATH = '/src/assets/images/sarf_logotype_fonte_suave.svg';
const LEFT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';
const RIGHT_DECORATION_PATH = '/src/assets/images/large-vertical-waves.svg';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const formatMessage = useFormatMessage(); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPending, startTransition] = useTransition(); 

    const form = useForm<CreateUserRequestPayload>({
        resolver: zodResolver(CreateUserRequestPayloadSchema),
        mode: 'onBlur', 
        defaultValues: { 
            email: '',
            credentials: {
                value: '',
                confirmValue: '',
                type: 'password', 
                temporary: false 
            },
            params: {},
            username: '',
            enabled: true,
        }
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const registerUser = useCallback(
        async (data: CreateUserRequestPayload) => {
            console.log('RegisterPage: registerUser called with data:', data);

            if (data.credentials.value !== data.credentials.confirmValue) {
                 form.setError('credentials.confirmValue', {
                    type: 'manual',
                    message: formatMessage('auth.register.feedback.wrong-credentials'),
                });
                console.log('Password confirmation failed'); 
                return; 
            }

            const finalPayload = {
                ...data, 
                username: data.email, 
                credentials: { 
                    ...data.credentials,
                    type: data.credentials.type ?? 'password',
                    temporary: data.credentials.temporary ?? false,
                },
                params: {
                    ...data.params,
                    realm: 'SARF' 
                }
            };
            console.log('RegisterPage: Final payload to send:', finalPayload);


            try {
                await register(
                    finalPayload,
                    () => {
                     },
                    () => {
                        startTransition(() => {
                            const encodedEmail = encodeURIComponent(data.email);
                            navigate(`/email?address=${encodedEmail}`);
                        });
                    }
                );
            } catch (error) {
                form.setError('root.unexpected', {
                    type: 'unexpected',
                    message: formatMessage('form.unexpected'),
                });
            }
        },
        [form, register, navigate, formatMessage, startTransition]
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
                    position: 'absolute', left: 150, top: 0, height: '100vh',
                    width: { md: '250px', lg: '350px' }, maxWidth: '30%',
                    objectFit: 'cover', zIndex: 0,
                }}
            />

            <Stack
                component="main"
                p={{ xs: 3, md: 5 }}
                gap={3} 
                alignItems='center'
                width={{ xs: '90%', sm: 450, md: 500 }}
                bgcolor={theme.palette.juicy.neutral[10]}
                borderRadius={2}
                zIndex={1} 
            >
                <Box
                    component="img"
                    src={SARF_LOGO_PATH}
                    alt="SARF Logo"
                    sx={{
                        width: { xs: '70%', sm: 300, md: 320 }, maxWidth: '320px',
                        height: 'auto', mb: 4,
                    }}
                />

                <Stack
                    component="form"
                    onSubmit={form.handleSubmit(
                        registerUser,
                        (errors) => {
                            console.error('!!! FORM VALIDATION FAILED !!!', errors);
                        }
                    )} width='100%'
                    gap={2.5} 
                    noValidate 
                >
                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="email-input">
                            {formatMessage('auth.user.email')}
                        </Typography>
                        <ControlledTextField
                            id="email-input"
                            variant="outlined"
                            placeholder={formatMessage('auth.user.email')}
                            control={form.control}
                            name='email' 
                            type='email'
                            clearable={false}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: inputBackgroundColor } }}
                        />
                  
      
                    </Stack>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="password-input">
                            {formatMessage('auth.user.password') }
                        </Typography>
                        <ControlledTextField
                            id="password-input"
                            variant="outlined"
                            placeholder={formatMessage('auth.user.password') }
                            control={form.control}
                            name='credentials.value' 
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
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: inputBackgroundColor } }}
                        />
                    </Stack>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight="medium" component="label" htmlFor="confirm-password-input">
                            {formatMessage('auth.user.confirmPass')}
                        </Typography>
                        <ControlledTextField
                            id="confirm-password-input"
                            variant="outlined"
                            placeholder={formatMessage('auth.user.confirmPass') }
                            control={form.control}
                            name='credentials.confirmValue'
                            type={showConfirmPassword ? 'text' : 'password'}
                            clearable={false}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: inputBackgroundColor } }}
                        />
                    </Stack>



                     <Box sx={{ pt: 2 }} />

                    {(form.formState.errors.root?.server || form.formState.errors.root?.unexpected) && (
                        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                            {form.formState.errors.root?.server?.message || form.formState.errors.root?.unexpected?.message}
                        </Typography>
                    )}

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        size='large'
                        sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
                        disabled={form.formState.isSubmitting || isPending}
                    >
                        {form.formState.isSubmitting || isPending
                            ? (formatMessage('auth.register.loading'))
                            : (formatMessage('auth.register.button'))}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                        {formatMessage('auth.register.noAccount')}{'  '}
                        <MuiLink
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                            fontWeight="medium"
                        >
                            {formatMessage('auth.register.loginNow')}
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
                     position: 'absolute', right: 150, top: 0, height: '100vh',
                     width: { md: '250px', lg: '350px' }, maxWidth: '30%',
                     objectFit: 'cover', zIndex: 0,
                    transform: 'scaleX(-1)',

                 }}
            />
        </Stack>
    );
};

export default RegisterPage;