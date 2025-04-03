import { useParams } from 'react-router-dom'

import { EngineeringData } from '@/components/engineering-data'
import NotFoundNavigation from '@/components/navigation/not-found'
import { ENDPOINTS } from '@/constants/endpoints'
import { LoadingContext } from '@/contexts/loading'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'
import { EngineeringDataDetailsCalibration } from '@/pages/engineering-data/calibration'
import { EngineeringDataDetailsReading } from '@/pages/engineering-data/reading'
import { Calibration as CalibrationType } from '@/schemas/calibration'
import {
	EngineeringDataDetails as EngineeringDataDetailsType,
	EngineeringData as EngineeringDataType,
} from '@/schemas/engineering-data'
import { InstrumentType } from '@/schemas/instrument'
import { Reading } from '@/schemas/reading'

const EngineeringDataPage = <C extends CalibrationType, R extends Reading, D extends EngineeringDataType>() => {
	const formatMessage = useFormatMessage()

	const { instrumentType, engineeringDataId } = useParams()

	const { data: engineeringDataDetails, isLoading } = useGetBy<EngineeringDataDetailsType<C, R, D>>({
		endpoint: `${ENDPOINTS.ENGINEERING_DATA}/${ENDPOINTS[instrumentType as InstrumentType]}`,
		id: engineeringDataId ?? '',
	})

	if (!engineeringDataDetails && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack isLoading={isLoading}>
					{`${formatMessage('instrument.engineering-value.title.plural')} ${engineeringDataDetails?.date}`}
				</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>
			<ViewLayout.Content>
				<LoadingContext.Provider value={isLoading}>
					<EngineeringData
						engineeringData={engineeringDataDetails}
						instrumentType={instrumentType as InstrumentType}
					/>

					<EngineeringDataDetailsReading
						reading={engineeringDataDetails?.reading}
						instrumentType={instrumentType as InstrumentType}
					/>

					<EngineeringDataDetailsCalibration
						calibration={engineeringDataDetails?.calibration}
						instrumentType={instrumentType as InstrumentType}
					/>
				</LoadingContext.Provider>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default EngineeringDataPage
