import { Grid } from '@mui/material'
import { Control, useFormContext } from 'react-hook-form'

import ControlledLocationInputs from '../../../ui/inputs/location-inputs'
import ControlledTextField from '../../../ui/inputs/text-field'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { WithLocationForm } from '@/schemas/location'
import { UarForm } from '@/schemas/uar'

const UarFields = () => {
	const { control } = useFormContext<UarForm>()
	const formatMessage = useFormatMessage()

	return (
		<Grid container spacing={3}>
			<Grid item xs={6}>
				<ControlledTextField control={control} name='name' label={formatMessage('name')} />
			</Grid>

			<Grid item xs={6}>
				<ControlledTextField control={control} name='lndbRef' label={formatMessage('uar.lndb-reference')} />
			</Grid>

			<Grid item xs={12}>
				<ControlledLocationInputs control={control as unknown as Control<WithLocationForm>} subtitle />
			</Grid>
		</Grid>
	)
}

export default UarFields
