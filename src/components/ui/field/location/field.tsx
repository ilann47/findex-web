import { ReactNode } from 'react'

import { Skeleton, Stack } from '@mui/material'

import { GridContainer } from '../../container/grid'
import { InfoWarning } from '../../feedback/warning/info'
import { Field } from '@/components/ui/field'
import { Map } from '@/components/ui/map'
import { Marker } from '@/components/ui/map/marker'
import { Text } from '@/components/ui/text'
import { useLoading } from '@/contexts/loading'
import { Location } from '@/schemas/location'
import { theme } from '@/theme'

interface Props {
	location?: Location | null
	additionalFields?: ReactNode
}

export const LocationField = ({ location, additionalFields }: Props) => {
	const hasCoords = location?.latitude && location?.longitude
	const isLoading = useLoading()

	return (
		<>
			<Text message='location.title' variant='h2' />

			<GridContainer columns={3}>
				<Field component='grid' labelId='description'>
					{location?.description}
				</Field>
				<Field component='grid' labelId='location.block'>
					{location?.block?.name}
				</Field>
				<Field component='grid' labelId='location.gallery'>
					{location?.gallery?.name}
				</Field>
				<Field component='grid' labelId='location.elevation'>
					{location?.elevation}
				</Field>
				<Field component='grid' labelId='location.axle'>
					{location?.axle}
				</Field>
				<Field component='grid' labelId='location.stretch' xs={1}>
					{location?.block?.stretch &&
						`${location?.block?.stretch?.name} (${location?.block?.stretch?.acronym})`}
				</Field>
				{additionalFields}
			</GridContainer>

			{hasCoords ? (
				<Map {...(hasCoords && { center: [location.latitude, location.longitude] as [number, number] })}>
					{hasCoords && <Marker position={[location.latitude, location.longitude] as [number, number]} />}
				</Map>
			) : isLoading ? (
				<Skeleton variant='rectangular' height={theme.spacing(50)} />
			) : (
				<Stack
					height={theme.spacing(50)}
					border={`2px solid ${theme.palette.juicy.neutral[30]}`}
					justifyContent='center'
					alignItems='center'
				>
					<InfoWarning descriptionId='message.location.not-found' />
				</Stack>
			)}
		</>
	)
}
