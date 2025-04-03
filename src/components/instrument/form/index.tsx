/* eslint-disable indent */
import { RefObject, useCallback, useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import InstrumentFields from './fields'
import InstrumentChannelsFields from './fields/channels'
import InstrumentLocationField from './fields/location'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetFile } from '@/hooks/file/get-file'
import { useInstrumentFormChannels } from '@/hooks/form/instrument'
import { useGetAll } from '@/hooks/get'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useMutate } from '@/hooks/mutate'
import { Channel } from '@/schemas/channels'
import {
	Instrument,
	InstrumentForm as InstrumentFormType,
	instrumentFormSchema,
	instrumentToInstrumentFormParser,
} from '@/schemas/instrument'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface InstrumentFormProps {
	modalRef: RefObject<ModalOptions>
	instrumentId?: string
}

const InstrumentForm = ({ modalRef, instrumentId }: InstrumentFormProps) => {
	const formatMessage = useFormatMessage()

	const { data: instrument } = useGetBy<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
		id: instrumentId ?? '',
	})

	const { data: channels } = useGetAll<Channel>({
		endpoint: ENDPOINTS.CHANNEL,
		requestParams: {
			instrumentId: Number(instrumentId),
		},
		enabled: !!instrumentId,
	})

	const { file: image } = useGetFile({
		endpoint: `${ENDPOINTS.INSTRUMENT}/${instrumentId}/image`,
		filename: 'instrument.image.filename',
		enabled: !!instrumentId,
	})

	const { create, update, sendFile, removeFile } = useMutate<Instrument, InstrumentFormType>({
		endpoint: ENDPOINTS.INSTRUMENT,
		invalidateQueries: [
			[ENDPOINTS.INSTRUMENT, Number(instrumentId)],
			[`${ENDPOINTS.INSTRUMENT}/${instrumentId}/image`],
			[ENDPOINTS.CHANNEL, { instrumentId: Number(instrumentId) }],
			[`${ENDPOINTS.UAR}/${instrument?.uar.id}/${ENDPOINTS.AVAILABLE_CHANNELS}`],
		],
	})

	const defaultValues: InstrumentFormType = useMemo(
		() =>
			instrument
				? instrumentToInstrumentFormParser.parse(instrument)(channels, image)
				: getSchemaDefaults(instrumentFormSchema),
		[instrument, channels, image]
	)

	const form = useForm<InstrumentFormType>({
		values: defaultValues,
		resolver: zodResolver(instrumentFormSchema),
	})

	const { reset } = form

	const onSubmit = useCallback(
		async (params: InstrumentFormType) => {
			closeModal(modalRef)()
			reset()

			if (instrumentId) {
				handleUpdate(params)
			} else {
				handleCreate(params)
			}
		},
		[instrumentId]
	)

	const handleCreate = useCallback(async (params: InstrumentFormType) => {
		const result = await create({
			body: params,
			successMessage: 'instrument.form.register.sucess-feedback',
		})

		if (params.image) {
			uploadInstrumentImage(params.image, result.data.id)
		}
	}, [])

	const handleUpdate = useCallback(
		async (params: InstrumentFormType) => {
			await update({
				id: instrumentId ?? '',
				body: params,
				successMessage: 'instrument.form.edit.sucess-feedback',
			})

			if (params.image && instrumentId) {
				uploadInstrumentImage(params.image, instrumentId)
			} else {
				removeFile({ fileName: 'image', id: instrumentId ?? '' })
			}
		},
		[instrumentId, removeFile]
	)

	const uploadInstrumentImage = useCallback(
		async (file: File, instrumentId: string | number) => {
			await sendFile({
				file: file,
				id: instrumentId,
				fileName: 'image',
			})
		},
		[instrumentId]
	)

	const { onTypeChange } = useInstrumentFormChannels(form, instrumentId)

	useEffect(() => {
		onTypeChange(defaultValues.type)
	}, [])

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				title={{
					id: instrumentId ? 'form.edit-item' : 'form.register-item',
					values: {
						item: formatMessage('instrument.title.singular'),
					},
				}}
				description={instrumentId ? 'instrument.form.edit.description' : 'instrument.form.register.description'}
				width={theme.spacing(130)}
				onSubmit={onSubmit}
				steps={[
					{
						label: 'general',
						fields: ['name', 'type', 'serialNumber', 'uarId'],
						component: <InstrumentFields instrumentId={instrumentId} />,
					},
					{
						label: 'location.title',
						fields: [
							'location.description',
							'location.blockId',
							'location.galleryId',
							'location.elevation',
							'location.axle',
							'construction',
							'geologicalProfileId',
							'location.latitude',
							'location.longitude',
						],
						component: <InstrumentLocationField />,
					},
					{
						label: 'channel.title.plural',
						fields: ['channels'],
						component: <InstrumentChannelsFields defaultValues={defaultValues} />,
					},
				]}
			/>
		</FormProvider>
	)
}

export default InstrumentForm
