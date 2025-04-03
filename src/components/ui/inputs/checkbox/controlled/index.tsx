/* eslint-disable prettier/prettier */
import { useCallback } from 'react'

import { Control, Controller, Path } from 'react-hook-form'

import Checkbox, { CheckboxProps } from '..'

interface Props<F extends object, T> extends Omit<CheckboxProps, 'checked'> {
	control: Control<F>
	name: Path<F>
	type?: 'string' | 'number'
	isEqual?: (one: T, another: T) => boolean
}

const ControlledCheckbox = <F extends object, T = string>({
	name,
	control,
	type = 'string',
	value,
	isEqual,
	...props
}: Props<F, T>) => {
	const formatValue = useCallback((value: unknown) => (type == 'number' ? Number(value) : value), [type])
	const isDifferent = useCallback((one: T, another: T) => (isEqual ? !isEqual(one, another) : one != another), [])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
				const { ref, value: fieldValue, ...rest } = field

				const isChecked = Array.isArray(fieldValue)
					? (fieldValue as Array<unknown>).includes(value)
					: !!fieldValue

				return (
					<Checkbox
						{...rest}
						{...props}
						checked={isChecked}
						onChange={(e) => {
							const checked = e.target.checked

							const newValue = Array.isArray(fieldValue)
								? checked
									? [...fieldValue, formatValue(value)]
									: (fieldValue as Array<unknown>).filter((item) =>
										isDifferent(item as T, value as T)
									)
								: formatValue(checked)

							field.onChange(newValue)
						}}
					/>
				)
			}}
		/>
	)
}

export default ControlledCheckbox
