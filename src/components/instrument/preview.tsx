import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Field } from '../ui/field'
import { Button } from '../ui/inputs/button'
import EnabledTag from '../ui/tags/enabled-tag'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument: Instrument
}
const InstrumentPreview = ({ instrument }: Props) => {
	const navigate = useNavigate()

	return (
		<Stack gap={3}>
			<Field labelId='name' gap={1}>
				{instrument.name}
			</Field>
			<Field labelId='location.title' gap={1}>
				{instrument.location?.description}
			</Field>
			<Field labelId='enabled' gap={1}>
				{<EnabledTag enabled={instrument.enabled} />}
			</Field>

			<Button
				label='view-details'
				onClick={() => navigate(`${instrument.type}/${instrument.id}`)}
				variant='contained'
				sx={{ textDecoration: 'none', color: '#FFF !important' }}
				size='small'
			/>
		</Stack>
	)
}

export default InstrumentPreview
