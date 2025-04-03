import { useParams } from 'react-router-dom'

import { RolesSection } from './roles'
import { UsersSection } from './users'
import NotFoundNavigation from '@/components/navigation/not-found'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAuthGetOne } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'
import { Group } from '@/schemas/auth'

type SectionName = 'roles' | 'users'

const GroupPage = () => {
	const { groupId } = useParams()
	const { data: group, isLoading } = useAuthGetOne<Group>({
		endpoint: ENDPOINTS.GROUP,
		idParam: {
			idGroup: groupId,
		},
	})

	const formatMessage = useFormatMessage()

	const SECTIONS: Section<SectionName>[] = [
		{
			label: 'auth.role.title.plural',
			value: 'roles',
		},
		{
			label: 'auth.user.title.plural',
			value: 'users',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	if (!group && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack isLoading={isLoading}>
					{[formatMessage('auth.group.title.singular'), group?.name].join(' ')}
				</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section == 'roles' && <RolesSection group={group} />}
				{section == 'users' && <UsersSection groupName={group?.name} />}
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default GroupPage
