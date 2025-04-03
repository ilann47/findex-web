import { Grid } from '@mui/material'
import { Control, useFormContext } from 'react-hook-form'

import ControlledLocationInputs from '@/components/ui/inputs/location-inputs'
import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { GeologicalProfile, InstrumentForm } from '@/schemas/instrument'
import { WithLocationForm } from '@/schemas/location'

const InstrumentLocationField = () => {
	const { control } = useFormContext<InstrumentForm>()
	const formatMessage = useFormatMessage()

	const { data: geolocialProfiles } = useGetAll<GeologicalProfile>({ endpoint: ENDPOINTS.GEOLOGICAL_PROFILE })

	return (
		<ControlledLocationInputs
			control={control as unknown as Control<WithLocationForm>}
			additionalFields={
				<>
					<Grid item xs={2}>
						<ControlledTextField
							control={control}
							name='construction'
							label={formatMessage('location.construction')}
						/>
					</Grid>
					<Grid item xs={2}>
						<ControlledSelect
							control={control}
							name='geologicalProfileId'
							label={formatMessage('location.geological-profile')}
							items={geolocialProfiles.map((geologicalProfile) => ({
								label: geologicalProfile.name,
								value: geologicalProfile.id,
							}))}
						/>
					</Grid>
				</>
			}
		/>
	)
}

export default InstrumentLocationField
