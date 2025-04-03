import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, Path } from 'react-hook-form'

import { ClearInput } from '../clear-input'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

interface Props<T extends object> {
	control: Control<T>
	name: Path<T>
	nullable?: boolean
}

type ControlledTextFieldProps<T extends object> = Props<T> & TextFieldProps

const ControlledTextField = <T extends object>({ control, name, nullable, ...props }: ControlledTextFieldProps<T>) => {
	const formatMessage = useFormatMessage()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...props}
					{...(props.type == 'number' && { onChange: (e) => field.onChange(+e.target?.value) })}
					error={!!error}
					helperText={error && formatMessage(error.message as Message)}
					fullWidth
					value={field.value || ''}
					InputProps={{
						endAdornment: field.value ? (
							<ClearInput onClick={() => field.onChange(nullable ? null : '')} />
						) : null,
					}}
				/>
			)}
		/>
	)
}

export default ControlledTextField
