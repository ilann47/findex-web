import { Divider } from '@mui/material'

import { StyledContainer } from '@/components/ui/container'
import { GridContainer } from '@/components/ui/container/grid'
import { Field } from '@/components/ui/field'
import { LocationField } from '@/components/ui/field/location/field'
import { LoadingContext } from '@/contexts/loading'
import { Uar } from '@/schemas/uar'

interface Props {
	uar?: Uar
	isLoading?: boolean
}

const OverviewSection = ({ uar, isLoading = false }: Props) => {
	return (
		<LoadingContext.Provider value={isLoading}>
			<StyledContainer>
				<GridContainer>
					<Field component='grid' labelId='name'>
						{uar?.name}
					</Field>
					<Field component='grid' labelId='uar.lndb-reference'>
						{uar?.lndbRef}
					</Field>
				</GridContainer>

				<Divider />

				<LocationField location={uar?.location} />
			</StyledContainer>
		</LoadingContext.Provider>
	)
}

export default OverviewSection
