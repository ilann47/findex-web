import { useParams } from 'react-router-dom'

import { CalibrationHistory } from '@/components/calibration/history'
import NotFoundNavigation from '@/components/navigation/not-found'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'
import { Instrument } from '@/schemas/instrument'

const CalibrationHistoryPage = () => {
	const { instrumentId } = useParams()

	const { data: instrument, isLoading } = useGetBy<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
		id: instrumentId ?? '',
	})

	const formatMessage = useFormatMessage()

	if (!instrument && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack isLoading={isLoading}>
					{instrument &&
						`${formatMessage('instrument.title.singular')} ${instrument.name} - ${formatMessage('instrument.calibration.history')}`}
				</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<CalibrationHistory
					instrumentId={instrument?.id}
					instrumentType={instrument?.type}
					isLoading={isLoading}
				/>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default CalibrationHistoryPage
