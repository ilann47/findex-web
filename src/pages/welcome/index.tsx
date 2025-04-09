import { Text } from '@/components/ui/text'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'

const WelcomePage = () => {
	const formatMessage = useFormatMessage()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('welcome.title')}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Text message='welcome.description' />
				<Text message='welcome.role-warning' />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default WelcomePage
