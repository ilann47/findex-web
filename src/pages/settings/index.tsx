import { AlarmColors } from './alarm-colors'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'

const SettingsPage = () => {
	const formatMessage = useFormatMessage()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('setting.title.plural')}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<AlarmColors />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default SettingsPage
