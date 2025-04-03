import { Grid } from '@mui/material'

import { StyledContainer } from '@/components/ui/container'
import { GridContainer } from '@/components/ui/container/grid'
import { StyledGridContainer } from '@/components/ui/container/grid/styled'
import { Field } from '@/components/ui/field'
import { LocationField } from '@/components/ui/field/location/field'
import Image from '@/components/ui/image'
import { ENDPOINTS } from '@/constants/endpoints'
import { LoadingContext } from '@/contexts/loading'
import { useGetFile } from '@/hooks/file/get-file'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface Props {
	instrument?: Instrument
	isLoading?: boolean
}

const OverviewSection = ({ instrument, isLoading = false }: Props) => {
	const formatMessage = useFormatMessage()

	const { file, isLoading: isLoadingImg } = useGetFile({
		endpoint: `${ENDPOINTS.INSTRUMENT}/${instrument?.id}/image`,
		filename: 'instrument.calibration.calibration-sheet',
		enabled: !!instrument,
	})

	return (
		<LoadingContext.Provider value={isLoading}>
			<StyledGridContainer>
				<Field component='grid' labelId='name'>
					{instrument?.name}
				</Field>
				<Field component='grid' labelId='instrument.serial'>
					{instrument?.serialNumber}
				</Field>
				<Field component='grid' labelId='type'>
					{instrument && formatMessage(`instrument.type.${snakeToKebabCase(instrument.type)}` as Message)}
				</Field>
				<Field component='grid' labelId='uar.acronym'>
					{instrument?.uar.name}
				</Field>
			</StyledGridContainer>

			<GridContainer spacing={3} maxHeight='60vh'>
				<Grid item xs={5} xl={3}>
					<StyledContainer>
						<LocationField
							location={instrument?.location}
							additionalFields={
								<>
									<Field component='grid' labelId='location.construction'>
										{instrument?.construction}
									</Field>
									<Field component='grid' labelId='location.geological-profile'>
										{instrument?.geologicalProfile?.name}
									</Field>
								</>
							}
						/>
					</StyledContainer>
				</Grid>

				<Grid item xs={5} xl={2}>
					<StyledContainer height='100%'>
						<Image file={file ?? null} isLoading={isLoadingImg} />
					</StyledContainer>
				</Grid>
			</GridContainer>
		</LoadingContext.Provider>
	)
}

export default OverviewSection
