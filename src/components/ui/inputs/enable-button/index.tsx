import { useCallback } from 'react'

import { FormControlLabel, Switch } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import { openModal, useModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal/confirmation'
import { Text } from '@/components/ui/text'
import { ENDPOINTS } from '@/constants/endpoints'
import { useMutate } from '@/hooks/mutate'

interface Props {
	entity: 'instrument' | 'uar'
	id: number
	enabled: boolean
	disabled?: boolean
}

export const EnableButton = ({ id, enabled, entity, disabled }: Props) => {
	const modalRef = useModal()

	const { patch } = useMutate({ endpoint: `${entity}/${id}/${ENDPOINTS.ENABLED}` })
	const queryClient = useQueryClient()

	const handleClick = useCallback(async () => {
		patch({
			successMessage: `${entity}.form.change-status.sucess-feedback`,
			body: {},
		})

		setTimeout(() => queryClient.invalidateQueries({ queryKey: [entity, id] }), 500)
	}, [id, entity])

	return (
		<>
			<FormControlLabel
				control={<Switch checked={enabled} onChange={openModal(modalRef)} disabled={disabled} />}
				label={<Text message={enabled ? 'enabled' : 'disabled'} fontSize={14} />}
			/>

			<ConfirmationModal
				modalRef={modalRef}
				title={enabled ? `${entity}.form.disable.title` : `${entity}.form.enable.title`}
				description={enabled ? `${entity}.form.disable.description` : `${entity}.form.enable.description`}
				onConfirm={handleClick}
			/>
		</>
	)
}
