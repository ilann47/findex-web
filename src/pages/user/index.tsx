import { Divider } from '@mui/material'
import { useParams } from 'react-router-dom'

import { GroupsTable } from '@/components/auth/group/table'
import NotFoundNavigation from '@/components/navigation/not-found'
import { StyledContainer } from '@/components/ui/container'
import { GridContainer } from '@/components/ui/container/grid'
import { Field } from '@/components/ui/field'
import EnabledTag from '@/components/ui/tags/enabled-tag'
import { Text } from '@/components/ui/text'
import { ENDPOINTS } from '@/constants/endpoints'
import { LoadingContext } from '@/contexts/loading'
import { useAuthGetOne } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { ViewLayout } from '@/layouts/view'
import { User } from '@/schemas/auth'

const UserPage: React.FC = () => {
	const { userId } = useParams()

	const { data: user, isLoading } = useAuthGetOne<User>({
		endpoint: ENDPOINTS.USER,
		idParam: {
			idUser: userId,
		},
	})

	const formatMessage = useFormatMessage()

	if (!user && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack isLoading={isLoading}>
					{[formatMessage('auth.user.title.singular'), user?.name, user?.surname].join(' ')}
				</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<LoadingContext.Provider value={isLoading}>
						<GridContainer>
							<Field component='grid' labelId='name'>
								{user?.name}
							</Field>
							<Field component='grid' labelId='surname'>
								{user?.surname}
							</Field>
							<Field component='grid' labelId='auth.user.username'>
								{user?.username}
							</Field>
							<Field component='grid' labelId='auth.user.email'>
								{user?.email}
							</Field>
							<Field component='grid' labelId='enabled'>
								<EnabledTag enabled={!!user?.enabled} />
							</Field>
						</GridContainer>
					</LoadingContext.Provider>

					<Divider />

					<Text message='auth.group.title.plural' variant='h2' />
					<GroupsTable user={user} isLoading={isLoading} />
				</StyledContainer>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default UserPage
