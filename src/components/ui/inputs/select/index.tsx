import { ForwardRefRenderFunction, forwardRef } from 'react'

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
	SelectProps as MuiSelectProps,
} from '@mui/material'

import Loading from '../../feedback/loading'
import { InfoWarning } from '../../feedback/warning/info'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { theme } from '@/theme'
import { Message } from '@/types/i18n'
import { LabelValue } from '@/types/label-value'

interface Props {
	items: LabelValue[]
	label?: string
	helperText?: Message
	error?: boolean
	isLoading?: boolean
}

export type SelectProps = Props & Omit<MuiSelectProps, 'ref'>

const Select: ForwardRefRenderFunction<HTMLDivElement, SelectProps> = (
	{ items, label, error, helperText, isLoading, ...props },
	ref
) => {
	const formatMessage = useFormatMessage()

	const isItemsValid = Array.isArray(items) && items.some((item) => item.label && item.value)

	return (
		<FormControl fullWidth error={error}>
			<InputLabel htmlFor='select'>{label}</InputLabel>

			<MuiSelect
				id='select'
				ref={ref}
				MenuProps={{
					PaperProps: {
						sx: {
							maxHeight: theme.spacing(20),
							maxWidth: 0, // for Paper has the width of the input
							display: isLoading || !isItemsValid ? 'flex' : '',
							justifyContent: isLoading || !isItemsValid ? 'center' : '',
						},
					},
				}}
				{...props}
			>
				{isLoading ? (
					<Loading minHeight={theme.spacing(5)} />
				) : isItemsValid ? (
					items.map((item) => (
						<MenuItem key={item.value} value={item.value}>
							{item.label}
						</MenuItem>
					))
				) : (
					<InfoWarning descriptionId='message.no-data' textAlign='center' maxWidth={theme.spacing(30)} />
				)}
			</MuiSelect>

			<FormHelperText>{helperText && formatMessage(helperText)}</FormHelperText>
		</FormControl>
	)
}

export default forwardRef(Select)
