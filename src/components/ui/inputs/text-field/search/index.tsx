import React from 'react'

import { Close, Search } from '@carbon/icons-react'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

import { IconButton } from '../../icon-button'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

interface Props extends Omit<TextFieldProps, 'placeholder'> {
	clear?: () => void
	placeholder?: Message
}

const SearchTextField: React.FC<Props> = ({ placeholder, clear, value, onChange, ...rest }) => {
	const formatMessage = useFormatMessage()

	return (
		<TextField
			placeholder={placeholder && formatMessage(placeholder)}
			sx={{
				maxWidth: (theme) => theme.spacing(30),
			}}
			InputProps={{
				slotProps: {
					input: {
						sx: {
							padding: 0,
						},
					},
					root: {
						sx: {
							paddingY: (theme) => theme.spacing(1),
						},
					},
				},
				startAdornment: (
					<InputAdornment position='start' sx={{ marginBottom: (theme) => theme.spacing(2) }}>
						<Search size={24} />
					</InputAdornment>
				),
				endAdornment: clear && (
					<InputAdornment position='end'>
						{!!value && (
							<IconButton size='small' onClick={clear} tooltip='clear'>
								<Close size={24} />
							</IconButton>
						)}
					</InputAdornment>
				),
			}}
			onChange={onChange}
			value={value}
			{...rest}
		/>
	)
}

export default SearchTextField
