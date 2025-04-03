import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledSelect from '@/components/ui/inputs/select/controlled'
import { ENDPOINTS } from '@/constants/endpoints'
import { useInstrumentFormChannels } from '@/hooks/form/instrument'
import { useGetAll } from '@/hooks/get'
import { InstrumentForm } from '@/schemas/instrument'
import { theme } from '@/theme'

interface Props {
	defaultValues: InstrumentForm
}

const InstrumentChannelsFields = ({ defaultValues }: Props) => {
	const form = useFormContext<InstrumentForm>()
	const { control, watch } = form

	const uarId = watch('uarId')
	const { data: availableChannels, isLoading } = useGetAll<string>({
		endpoint: `${ENDPOINTS.UAR}/${uarId}/${ENDPOINTS.AVAILABLE_CHANNELS}`,
	})

	const { channelsFields } = useInstrumentFormChannels(form)

	return (
		<>
			<Stack sx={{ maxHeight: theme.spacing(50), overflowY: 'auto', marginTop: 0 }}>
				{channelsFields.map((field, index) => (
					<Stack key={field.id} marginBottom={2}>
						<Stack>
							<ControlledSelect
								label={field.readingVariable}
								name={`channels.${index}.lndbRef`}
								control={control}
								items={[
									...(uarId == defaultValues.uarId ? field.lndbRef && [field.lndbRef] : []),
									...availableChannels,
								].map((channel) => {
									return {
										label: channel,
										value: channel,
									}
								})}
								isLoading={isLoading}
							/>
						</Stack>
					</Stack>
				))}
			</Stack>
		</>
	)
}

export default InstrumentChannelsFields
