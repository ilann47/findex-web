import { Control, Controller, Path } from 'react-hook-form'

import FileInput, { FileType } from '..'

interface ControlledFileInput<T extends object> {
	control: Control<T>
	name: Path<T>
	type: FileType
}

const ControlledFileInput = <T extends object>({ control, name, type }: ControlledFileInput<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => <FileInput {...field} file={field.value} type={type} />}
		/>
	)
}

export default ControlledFileInput
