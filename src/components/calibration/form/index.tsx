/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import CalibrationFields from './fields'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { instrumentTypeCalibrationFormSchemas, instrumentTypeReadingFormSchemas } from '@/constants/calibration'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetFile } from '@/hooks/file/get-file'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useMutate } from '@/hooks/mutate'
import { Calibration } from '@/schemas/calibration'
import { InstrumentType } from '@/schemas/instrument'
import { theme } from '@/theme'
import { DateObjectToDateString } from '@/utils/date'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface BaseProps {
	modalRef: RefObject<ModalOptions>
	instrumentType: InstrumentType
}

interface CreateProps extends BaseProps {
	type: 'create'
	instrumentId: number
}

interface UpdateProps extends BaseProps {
	type: 'update'
	calibrationId: number
}

type Props = CreateProps | UpdateProps

const CalibrationForm = ({ modalRef, instrumentType, ...props }: Props) => {
	const formatMessage = useFormatMessage()

	const formSchema = instrumentTypeCalibrationFormSchemas[instrumentType]
	type FormType = z.infer<typeof formSchema>
	const readingFormSchema = instrumentTypeReadingFormSchemas[instrumentType]

	const calibrationId = props.type == 'update' ? props.calibrationId : ''
	const instrumentId = props.type == 'create' ? props.instrumentId : -1

	const { create, update, sendFile, removeFile } = useMutate<Calibration, FormType>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS[instrumentType]}`,
		invalidateQueries: [[`${ENDPOINTS.CALIBRATION}/${ENDPOINTS[instrumentType]}/${calibrationId}/sheet`]],
	})

	const { data: calibration } = useGetBy<Calibration>({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS[instrumentType]}`,
		id: calibrationId,
	})

	const { file } = useGetFile({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS[instrumentType]}/${calibrationId}/sheet`,
		filename: 'instrument.calibration.calibration-sheet',
		enabled: props.type == 'update',
	})

	const defaultValues: FormType = (
		props.type == 'update' && calibration
			? {
					...formSchema.parse(calibration),
					...((calibration as unknown as { prioriReading: unknown }).prioriReading == null
						? {
								prioriReading: getSchemaDefaults(readingFormSchema),
							}
						: {}),
					...((calibration as unknown as { posterioriReading: unknown }).posterioriReading == null
						? {
								posterioriReading: getSchemaDefaults(readingFormSchema),
							}
						: {}),
					calibrationSheet: file,
				}
			: {
					...getSchemaDefaults(formSchema),
					instrumentId,
					prioriReading: getSchemaDefaults(readingFormSchema),
					posterioriReading: getSchemaDefaults(readingFormSchema),
				}
	) as FormType

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	})

	const { reset, watch } = form

	const calibrationSheet = watch('calibrationSheet')

	const onSubmit = useCallback(
		async (params: FormType) => {
			closeModal(modalRef)()
			reset()

			const parsedParams: FormType = {
				...params,
				startDate: DateObjectToDateString(params.startDate as Date),
				endDate: DateObjectToDateString(params.endDate as Date),
			}

			if (props.type == 'create') {
				handleCreate(parsedParams)
			} else {
				handleUpdate(parsedParams)
			}
		},
		[props]
	)

	const handleCreate = useCallback(async (params: FormType) => {
		const result = await create({
			body: params,
			successMessage: 'instrument.calibration.form.register.sucess-feedback',
		})

		if (params.calibrationSheet) {
			await uploadCalibrationSheet(params.calibrationSheet, result.data.id)
		}
	}, [])

	const handleUpdate = useCallback(
		async (params: FormType) => {
			await update({
				id: calibrationId,
				body: params,
				successMessage: 'instrument.calibration.form.edit.sucess-feedback',
			})

			await (params.calibrationSheet
				? uploadCalibrationSheet(params.calibrationSheet, calibrationId)
				: removeFile({ id: calibrationId, fileName: 'sheet' }))
		},
		[calibrationId]
	)

	const uploadCalibrationSheet = useCallback(async (calibrationSheet: File, calibrationId: number | string) => {
		await sendFile({
			file: calibrationSheet,
			id: calibrationId,
			fileName: 'sheet',
		})
	}, [])

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title={{
					id: props.type == 'create' ? 'form.register-item' : 'form.edit-item',
					values: {
						item: formatMessage('instrument.calibration.title.singular'),
					},
				}}
				description={
					props.type == 'create'
						? 'instrument.calibration.form.register.description'
						: 'instrument.calibration.form.edit.description'
				}
				width={calibrationSheet ? '80vw' : theme.spacing(140)}
			>
				<CalibrationFields instrumentType={instrumentType} type={props.type} />
			</ModalForm>
		</FormProvider>
	)
}

export default CalibrationForm
