import { RecentlyViewed } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'

import Channels from './channels'
import AcquisitionSectionLoading from './loading'
import { CurrentCalibration } from '@/components/calibration/current'
import { Formula } from '@/components/engineering-data/formula'
import { StyledContainer } from '@/components/ui/container'
import { Button } from '@/components/ui/inputs/button'
import { Text } from '@/components/ui/text'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument?: Instrument
	isLoading?: boolean
}

const AcquisitionSection = ({ instrument, isLoading }: Props) => {
	const navigate = useNavigate()

	if (isLoading) {
		return <AcquisitionSectionLoading />
	}

	return (
		<>
			<StyledContainer>
				<Text message='channel.title.plural' variant='h2' />
				{instrument && <Channels instrument={instrument} />}
			</StyledContainer>

			<StyledContainer>
				{instrument && (
					<CurrentCalibration
						instrumentId={instrument.id}
						instrumentType={instrument.type}
						adornment={
							<Button
								variant='text'
								label='view-history'
								startIcon={<RecentlyViewed />}
								onClick={() => navigate('calibration-history')}
							/>
						}
					/>
				)}
			</StyledContainer>

			<StyledContainer>
				<Text message='formula' variant='h2' />
				{instrument && <Formula instrumentType={instrument.type} />}
			</StyledContainer>
		</>
	)
}

export default AcquisitionSection
