/* eslint-disable prettier/prettier */
import GroupsSection from './groups'
import UsersSection from './users'
import { useAuth } from '@/hooks/auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'
import { Message } from '@/types/i18n'

type SectionName = 'users' | 'groups'

const AuthenticationPage: React.FC = () => {
	const formatMessage = useFormatMessage()
	const { userHasRole } = useAuth()

	const SECTIONS: Section<SectionName>[] = [
		...(userHasRole('AUTH_GROUP_LIST')
			? [
				{
					label: 'auth.group.title.plural' as Message,
					value: 'groups' as SectionName,
				},
			]
			: []),
		...(userHasRole('AUTH_USER_LIST')
			? [
				{
					label: 'auth.user.title.plural' as Message,
					value: 'users' as SectionName,
				},
			]
			: []),
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('auth.title')}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section == 'groups' && <GroupsSection />}
				{section == 'users' && <UsersSection />}
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AuthenticationPage
