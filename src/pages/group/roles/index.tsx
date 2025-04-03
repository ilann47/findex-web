import { useMemo, useState } from 'react'

import { AddRolesForm } from '@/components/auth/role/add-roles-form'
import { RolesTable } from '@/components/auth/role/table'
import { StyledContainer } from '@/components/ui/container'
import { Button } from '@/components/ui/inputs/button'
import { openModal, useModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal/confirmation'
import TableSkeleton from '@/components/ui/table/loading/skeleton'
import { KEYCLOAK_ID_CLIENT, KEYCLOAK_REALM } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAuthMutate } from '@/hooks/mutate'
import { ProtectedComponent } from '@/layouts/protected/component'
import { Group, RemoveRolesForm, Role } from '@/schemas/auth'

interface Props {
	group?: Group
}

export const RolesSection = ({ group }: Props) => {
	const [role, setRole] = useState<Role | null>(null)

	const formRef = useModal()
	const confirmationModalRef = useModal()

	const { remove } = useAuthMutate({
		endpoint: `${ENDPOINTS.GROUP}/${ENDPOINTS.ROLE}`,
		invalidateQueries: [[ENDPOINTS.ROLE]],
	})

	const removeRoleRequestParams: RemoveRolesForm | null | undefined = useMemo(
		() =>
			group &&
			role && {
				idClient: KEYCLOAK_ID_CLIENT,
				idGroup: group.id,
				realm: KEYCLOAK_REALM,
				roles: [role.name],
			},
		[group, role]
	)

	if (!group) return <TableSkeleton />

	return (
		<StyledContainer>
			<RolesTable
				groupName={group.name}
				endTableControls={
					<ProtectedComponent role='AUTH_GROUP_ASSIGN_ROLE'>
						<Button
							label='auth.role.assign'
							variant='contained'
							size='small'
							onClick={openModal(formRef)}
						/>
					</ProtectedComponent>
				}
				getEndRowNode={(role) => (
					<ProtectedComponent role='AUTH_GROUP_REMOVE_ROLE'>
						<Button
							variant='text'
							label='auth.role.unassign'
							onClick={() => {
								setRole(role)
								openModal(confirmationModalRef)()
							}}
						/>
					</ProtectedComponent>
				)}
			/>

			<AddRolesForm group={group} modalRef={formRef} />

			<ConfirmationModal
				modalRef={confirmationModalRef}
				onConfirm={() =>
					role &&
					remove({
						successMessage: 'auth.role.feedback.unassigned-role',
						requestParams: removeRoleRequestParams ?? undefined,
					})
				}
				title='auth.role.unassign-confirmation.title'
				description={{
					id: 'auth.role.unassign-confirmation.description',
					values: { roleName: role?.name },
				}}
			/>
		</StyledContainer>
	)
}
