import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/inputs/button'
import { AlarmTags } from '@/components/ui/tags/alarm-tag'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { Uar } from '@/schemas/uar'

interface Props {
	uar: Uar
}

export const UarPreview = ({ uar }: Props) => {
	const navigate = useNavigate()

	return (
		<Stack gap={3}>
			<Field labelId='name' gap={1}>
				{uar.name}
			</Field>
			<Field labelId='location.title' gap={1}>
				{uar.location?.description}
			</Field>
			<Field labelId='enabled' gap={1}>
				{<EnabledTag enabled={uar.enabled} />}
			</Field>
			<Field labelId='alarm.title.plural' gap={1}>
				{<AlarmTags alarms={uar.alarms ?? []} />}
			</Field>
			<Button
				label='view-details'
				onClick={() => navigate(`${uar.id}`)}
				variant='contained'
				sx={{ textDecoration: 'none', color: '#FFF !important' }}
				size='small'
			/>
		</Stack>
	)
}
