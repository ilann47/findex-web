import { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'

import { GridContainer } from '@/components/ui/container/grid'
import { Text } from '@/components/ui/text'

export interface CalibrationReadingProps {
	readingType: 'posterioriReading' | 'prioriReading'
}

const CalibrationReadingFieldsContainer = ({ readingType, children }: CalibrationReadingProps & PropsWithChildren) => {
	return (
		<Grid item xs={3}>
			<Text
				message={
					readingType == 'prioriReading'
						? 'instrument.readings.title.priori'
						: 'instrument.readings.title.posteriori'
				}
				variant='h2'
				mb={1}
			/>
			<GridContainer columns={6}>{children}</GridContainer>
		</Grid>
	)
}

export default CalibrationReadingFieldsContainer
