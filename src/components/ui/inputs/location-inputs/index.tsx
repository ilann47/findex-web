import { ReactNode } from 'react'

import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'

import { GridContainer } from '../../container/grid'
import ControlledMapInput from '../map-input'
import ControlledSelect from '../select/controlled'
import ControlledTextField from '../text-field'
import { Text } from '@/components/ui/text'
import { LOCATION_AXLES } from '@/constants/axle'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Block, WithLocationForm } from '@/schemas/location'

interface Props {
	control: Control<WithLocationForm>
	subtitle?: boolean
	additionalFields?: ReactNode
}

const ControlledLocationInputs = ({ subtitle, control, additionalFields }: Props) => {
	const formatMessage = useFormatMessage()

	const { data: blocks } = useGetAll<Block>({ endpoint: ENDPOINTS.BLOCK })
	const { data: galleries } = useGetAll<Block>({ endpoint: ENDPOINTS.GALLERY })

	return (
		<>
			{subtitle && <Text variant='h2' message='location.title' mb={1} />}
			<GridContainer spacing={3} columns={4}>
				<Grid item xs={4}>
					<ControlledTextField
						control={control}
						name='location.description'
						label={formatMessage('description')}
						nullable
					/>
				</Grid>

				<Grid item xs={1}>
					<ControlledSelect
						control={control}
						name='location.blockId'
						label={formatMessage('location.block')}
						items={blocks.map((block) => ({
							label: block.name,
							value: block.id,
						}))}
						nullable
					/>
				</Grid>

				<Grid item xs={1}>
					<ControlledSelect
						control={control}
						name='location.galleryId'
						label={formatMessage('location.gallery')}
						items={galleries.map((gallery) => ({
							label: gallery.name,
							value: gallery.id,
						}))}
						nullable
					/>
				</Grid>

				<Grid item xs={1}>
					<ControlledTextField
						control={control}
						name='location.elevation'
						label={formatMessage('location.elevation')}
						type='number'
						nullable
					/>
				</Grid>

				<Grid item xs={1}>
					<ControlledSelect
						control={control}
						name='location.axle'
						label={formatMessage('location.axle')}
						items={LOCATION_AXLES.map((axle) => ({
							label: axle,
							value: axle,
						}))}
					/>
				</Grid>

				{additionalFields}

				<Grid item xs={4}>
					<ControlledMapInput
						control={control}
						latlng={{ lat: 'location.latitude', lng: 'location.longitude' }}
					/>
				</Grid>
			</GridContainer>
		</>
	)
}

export default ControlledLocationInputs
