import { TextField, TextFieldProps, InputAdornment, Stack } from '@mui/material'; 
import { Control, Controller, Path } from 'react-hook-form';

import { ClearInput } from '../clear-input'; 
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { Message } from '@/types/i18n';

interface Props<T extends object> {
    control: Control<T>;
    name: Path<T>;
    nullable?: boolean;
    clearable?: boolean;
}

type ControlledTextFieldProps<T extends object> = Props<T> & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'>;

const ControlledTextField = <T extends object>({
    control,
    name,
    nullable,
    clearable = true, 
    InputProps: inputPropsFromCaller, 
    ...props 
}: ControlledTextFieldProps<T>) => {
    const formatMessage = useFormatMessage();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const callerEndAdornmentContent = inputPropsFromCaller?.endAdornment;

                const clearButtonComponent =
                    clearable && field.value ? (
                        <ClearInput onClick={() => field.onChange(nullable ? null : '')} />
                    ) : null;

                let combinedAdornmentContent = null;
                if (callerEndAdornmentContent && clearButtonComponent) {
                    combinedAdornmentContent = (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            {clearButtonComponent}
                            {callerEndAdornmentContent}
                        </Stack>
                    );
                } else if (callerEndAdornmentContent) {
                    combinedAdornmentContent = callerEndAdornmentContent;
                } else if (clearButtonComponent) {
                    combinedAdornmentContent = clearButtonComponent;
                }

                const finalInputProps = {
                    ...inputPropsFromCaller, 
                    endAdornment: combinedAdornmentContent ? ( 
                        <InputAdornment position="end">
                            {combinedAdornmentContent}
                        </InputAdornment>
                    ) : undefined, 
                };

                return (
                    <TextField
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value ?? ''} 
                        name={field.name}
                        ref={field.ref} 

                        {...(props.type === 'number' && {
                            onChange: (e) => {
                                const value = e.target?.value;
                                field.onChange(value === '' ? (nullable ? null : '') : +value);
                             }
                        })}
                        error={!!error}
                        helperText={error?.message ? formatMessage(error.message as Message) : props.helperText} 

                        {...props}
                        fullWidth 

                        InputProps={finalInputProps}
                    />
                );
            }}
        />
    );
};

export default ControlledTextField;