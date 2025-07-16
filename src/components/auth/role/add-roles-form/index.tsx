import { RefObject, useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, TextField } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { InfoWarning } from '@/components/ui/feedback/warning/info'
import Checkbox from '@/components/ui/inputs/checkbox'
import ControlledCheckbox from '@/components/ui/inputs/checkbox/controlled'
import { CheckboxLoading } from '@/components/ui/inputs/checkbox/loading'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { SelectedFiltersSummary } from '@/components/ui/selected-filters-summary'
import { KEYCLOAK_ID_CLIENT, KEYCLOAK_REALM } from '@/constants/auth'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAuthGetAll } from '@/hooks/get/get-auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useAuthMutate } from '@/hooks/mutate'
import { AddRolesForm as AddRolesFormType, Group, Role, addRolesFormSchema } from '@/schemas/auth'
import { getAuthEqualsFilter } from '@/utils/auth'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
	group: Group
}

export const AddRolesForm = ({ modalRef, group }: Props) => {
	const [name, setName] = useState('')

	const formatMessage = useFormatMessage()

	const clearName = useCallback(() => {
		setName('')
	}, [])

	const { create } = useAuthMutate({
		endpoint: `${ENDPOINTS.GROUP}/${ENDPOINTS.ROLE}`,
		invalidateQueries: [[ENDPOINTS.ROLE]],
	})

	const { data: groupRoles } = useAuthGetAll<Role>({
		endpoint: ENDPOINTS.ROLE,
		requestParams: {
			group: getAuthEqualsFilter(group.name),
		},
	})

	const { data: roles, isLoading: isLoadingRoles } = useAuthGetAll<Role>({
		endpoint: ENDPOINTS.ROLE,
	})

	const filteredRoles = useMemo(() => {
		return roles.filter(
			(role) =>
				!groupRoles.some((groupRole) => groupRole.id == role.id) &&
				role.name.toLowerCase().includes(name.toLowerCase())
		)
	}, [name, roles, groupRoles])

	const form = useForm<AddRolesFormType>({
		resolver: zodResolver(addRolesFormSchema),
		values: {
			...getSchemaDefaults(addRolesFormSchema),
			params: {
				idClient: KEYCLOAK_ID_CLIENT,
				idGroup: group.id,
				realm: KEYCLOAK_REALM,
			},
		},
	})

	const onSubmit = useCallback(
		async (form: AddRolesFormType) => {
			closeModal(modalRef)()

			create({
				body: form,
				successMessage: 'auth.role.feedback.assigned-roles',
			})
		},
		[create]
	)

	const selectedRoles = form.watch('roles')

	const allChecked = useMemo(
		() => filteredRoles.every((filteredRole) => selectedRoles.includes(filteredRole.name)),
		[filteredRoles, selectedRoles]
	)

	const handleSelectAll = useCallback(() => {
		if (allChecked) {
			form.setValue(
				'roles',
				selectedRoles.filter((roleName) => !filteredRoles.some((filteredRole) => filteredRole.name == roleName))
			)
		} else {
			form.setValue('roles', [...new Set([...selectedRoles, ...filteredRoles.map((role) => role.name)])])
		}
	}, [filteredRoles, selectedRoles, allChecked])

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title='auth.role.assign'
				primaryButtonLabel='form.confirm'
				width='616px'
				disabled={selectedRoles.length === 0}
				onClose={clearName}
			>
				<Stack gap={3}>
					<Stack direction='row' gap={3}>
						<TextField
							label={formatMessage('name')}
							fullWidth
							value={name}
							onChange={(event) => setName(event.target.value)}
							size='small'
						/>
					</Stack>

					<Stack gap={1}>
						{filteredRoles.length > 0 && (
							<Checkbox
								label={formatMessage('table.filtering.select-all')}
								checked={allChecked}
								onChange={handleSelectAll}
							/>
						)}

						<Stack height='24vh' gap={2} sx={{ overflow: 'auto' }}>
							{filteredRoles.map((role) => (
								<ControlledCheckbox
									key={role.id}
									label={role.name}
									description={role.description}
									control={form.control}
									name={'roles'}
									value={role.name}
								/>
							))}

							{isLoadingRoles &&
								Array.from({ length: 5 }).map((_, index) => <CheckboxLoading key={index} />)}

							{!isLoadingRoles && filteredRoles.length === 0 && (
								<InfoWarning descriptionId='no-data' p={4} />
							)}
						</Stack>
					</Stack>

					<SelectedFiltersSummary selected={selectedRoles} />
				</Stack>
			</ModalForm>
		</FormProvider>
	)
}
