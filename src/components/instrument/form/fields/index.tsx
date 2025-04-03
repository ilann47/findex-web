import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledSelect from '../../../ui/inputs/select/controlled'
import ControlledTextField from '../../../ui/inputs/text-field'
import ControlledFileInput from '@/components/ui/inputs/file-input/controlled'
import { Text } from '@/components/ui/text'
import { ENDPOINTS } from '@/constants/endpoints'
import { INSTRUMENT_TYPES } from '@/constants/instrument'
import { useInstrumentFormChannels } from '@/hooks/form/instrument'
import { useGetAll } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { InstrumentForm, InstrumentType } from '@/schemas/instrument'
import { Uar } from '@/schemas/uar'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface Props {
	instrumentId?: string
}

const InstrumentFields = ({ instrumentId }: Props) => {
	const form = useFormContext<InstrumentForm>()
	const { control } = form

	const formatMessage = useFormatMessage()
	const { data: uars, isLoading: isUarLoading } = useGetAll<Uar>({ endpoint: ENDPOINTS.UAR })

	const { onTypeChange, onUarChange } = useInstrumentFormChannels(form, instrumentId)

	return (
		<Grid container spacing={3}>
			<Grid item xs={6}>
				<ControlledTextField control={control} name='name' label={formatMessage('name')} />
			</Grid>
			<Grid item xs={6}>
				<ControlledTextField control={control} name='serialNumber' label={formatMessage('instrument.serial')} />
			</Grid>
			<Grid item xs={6}>
				<ControlledSelect
					control={control}
					name='type'
					label={formatMessage('type')}
					items={INSTRUMENT_TYPES.map((instrumentType) => {
						return {
							label: formatMessage(`instrument.type.${snakeToKebabCase(instrumentType)}` as Message),
							value: instrumentType,
						}
					})}
					disabled={!!instrumentId}
					onChange={(event) => onTypeChange(event.target.value as InstrumentType)}
				/>
			</Grid>
			<Grid item xs={6}>
				<ControlledSelect
					control={control}
					name='uarId'
					label={formatMessage('uar.acronym')}
					items={uars.map((uar) => {
						return {
							label: uar.name,
							value: uar.id,
						}
					})}
					onChange={onUarChange}
					isLoading={isUarLoading}
				/>
			</Grid>
			<Grid item xs={12}>
				<Text message='image' mb={1} variant='h4' />
				<ControlledFileInput name='image' control={control} type='image' />
			</Grid>
		</Grid>
	)
}

export default InstrumentFields
