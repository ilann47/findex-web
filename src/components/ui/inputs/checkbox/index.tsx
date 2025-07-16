import {
	FormControlLabel,
	Checkbox as MuiCheckbox,
	CheckboxProps as MuiCheckboxProps,
	Stack,
	Typography,
} from '@mui/material'

export interface CheckboxProps extends MuiCheckboxProps {
	label: string
	description?: string
}

const Checkbox = ({ label, description, ...props }: CheckboxProps) => {
	return (
		<FormControlLabel
			label={
				<Stack>
					<Typography>{label}</Typography>
					{description && (
						<Typography variant='body2' color={(theme) => theme.palette.juicy.neutral[60]}>
							{description}
						</Typography>
					)}
				</Stack>
			}
			control={<MuiCheckbox {...props} />}
		/>
	)
}

export default Checkbox
