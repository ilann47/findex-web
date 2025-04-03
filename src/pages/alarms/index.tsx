import { AlarmsTable } from '@/components/alarm/table'
import { StyledContainer } from '@/components/ui/container'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'

const AlarmsPage = () => {
	const formatMessage = useFormatMessage()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('alarm.title.plural')}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<AlarmsTable />
				</StyledContainer>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AlarmsPage
