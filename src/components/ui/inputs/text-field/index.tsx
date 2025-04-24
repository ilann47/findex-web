import { TextField, TextFieldProps, InputAdornment, Stack } from '@mui/material'; // Import InputAdornment, Stack
import { Control, Controller, Path } from 'react-hook-form';
import React from 'react'; // Import React for JSX processing

import { ClearInput } from '../clear-input'; // Assuming ClearInput is an IconButton or similar component
import { useFormatMessage } from '@/hooks/i18n/format-message';
import { Message } from '@/types/i18n';

interface Props<T extends object> {
    control: Control<T>;
    name: Path<T>;
    nullable?: boolean;
    clearable?: boolean;
}

// Ensure InputProps is part of TextFieldProps for correct typing if needed,
// but usually TextFieldProps includes it. We Omit RHF props passed via field.
type ControlledTextFieldProps<T extends object> = Props<T> & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'>;

const ControlledTextField = <T extends object>({
    control,
    name,
    nullable,
    clearable = true, // Default clearable
    InputProps: inputPropsFromCaller, // Destructure InputProps passed by the caller
    ...props // The rest of the TextFieldProps (variant, placeholder, sx, etc.)
}: ControlledTextFieldProps<T>) => {
    const formatMessage = useFormatMessage();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                // 1. Get the end adornment component *content* passed by the caller
                const callerEndAdornmentContent = inputPropsFromCaller?.endAdornment?.props?.children;

                // 2. Create the clear button component (just the button/icon itself)
                const clearButtonComponent =
                    clearable && field.value ? (
                        <ClearInput onClick={() => field.onChange(nullable ? null : '')} />
                    ) : null;

                // 3. Combine the adornment contents if both exist
                let combinedAdornmentContent = null;
                if (callerEndAdornmentContent && clearButtonComponent) {
                    // Render both, maybe Clear first then the caller's content (e.g., visibility)
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

                // 4. Construct the final InputProps object
                const finalInputProps = {
                    ...inputPropsFromCaller, // Start with caller's props (like startAdornment, classes, etc.)
                    endAdornment: combinedAdornmentContent ? ( // Only add InputAdornment wrapper if there's content
                        <InputAdornment position="end">
                            {combinedAdornmentContent}
                        </InputAdornment>
                    ) : undefined, // Set to undefined if no adornment content
                };

                return (
                    <TextField
                        // RHF props
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value ?? ''} // Use nullish coalescing for robustness
                        name={field.name}
                        ref={field.ref} // Pass ref for RHF

                        // Component specific logic
                        {...(props.type === 'number' && {
                            onChange: (e) => {
                                // Handle potential empty string for number type correctly
                                const value = e.target?.value;
                                field.onChange(value === '' ? (nullable ? null : '') : +value);
                             }
                        })}
                        error={!!error}
                        helperText={error?.message ? formatMessage(error.message as Message) : props.helperText} // Prefer RHF error, fallback to prop

                        // Rest of the TextField props passed in
                        {...props}
                        fullWidth // Assuming this is always desired for this component

                        // Merged InputProps
                        InputProps={finalInputProps}
                    />
                );
            }}
        />
    );
};

export default ControlledTextField;