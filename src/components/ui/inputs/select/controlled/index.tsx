import { Control, Controller, Path } from 'react-hook-form'

import Select, { SelectProps } from '..'
import { ClearInput } from '../../clear-input'
import { Message } from '@/types/i18n'
import { LabelValue } from '@/types/label-value'
interface Props<T extends object> {
	control: Control<T>
	name: Path<T>
	items: LabelValue[]
	nullable?: boolean
	onClear?: () => void
}

type ControlledSelectProps<T extends object> = Props<T> & SelectProps

const ControlledSelect = <T extends object>({
	control,
	name,
	items,
	nullable,
	onClear,
	...props
}: ControlledSelectProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Select
					{...field}
					{...props}
					onChange={(e, child) => {
						props.onChange && props.onChange(e, child)
						field.onChange(e, child)
					}}
					items={items}
					error={!!error}
					helperText={error && (error.message as Message)}
					value={field.value || ''}
					endAdornment={
						field.value ? (
							<ClearInput
								onClick={() => {
									field.onChange(nullable ? null : '')
									onClear && onClear()
								}}
								sx={{ mr: 3 }}
							/>
						) : undefined
					}
				/>
			)}
		/>
	)
}

export default ControlledSelect
