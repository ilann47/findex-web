/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import UarFields from './fields'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useMutate } from '@/hooks/mutate'
import { Uar, UarForm as UarFormType, uarFormSchema, uartoUarFormParser } from '@/schemas/uar'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface UarFormProps {
	modalRef: RefObject<ModalOptions>
	uarId?: string
}

const UarForm = ({ modalRef, uarId }: UarFormProps) => {
	const formatMessage = useFormatMessage()
	const { create, update } = useMutate({
		endpoint: ENDPOINTS.UAR,
		invalidateQueries: [[ENDPOINTS.UAR, Number(uarId)]],
	})

	const { data: uar } = useGetBy<Uar>({ endpoint: ENDPOINTS.UAR, id: uarId ?? '' })

	const defaultValues: UarFormType = uar ? uartoUarFormParser.parse(uar) : getSchemaDefaults(uarFormSchema)

	const form = useForm<UarFormType>({
		resolver: zodResolver(uarFormSchema),
		values: defaultValues,
	})

	const { reset } = form

	const onSubmit = useCallback(
		async (params: UarFormType) => {
			closeModal(modalRef)()
			reset()

			await (uarId
				? update({
						id: uarId,
						body: params,
						successMessage: 'uar.form.edit.sucess-feedback',
					})
				: create({
						body: params,
						successMessage: 'uar.form.register.sucess-feedback',
					}))
		},
		[uarId, modalRef]
	)

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title={{
					id: uar ? 'form.edit' : 'form.register-item',
					values: {
						item: formatMessage('uar.acronym'),
					},
				}}
				description={uar ? 'uar.form.edit.description' : undefined}
				width={theme.spacing(120)}
			>
				<UarFields />
			</ModalForm>
		</FormProvider>
	)
}

export default UarForm
