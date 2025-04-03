import { useCallback } from 'react'

import { UseFormReturn, useFieldArray } from 'react-hook-form'

import { useGetAll } from '../get'
import { ENDPOINTS } from '@/constants/endpoints'
import { INSTRUMENT_READING_VARIABLES } from '@/constants/reading-variables'
import { Channel } from '@/schemas/channels'
import { InstrumentType } from '@/schemas/instrument'
import { InstrumentForm as InstrumentFormType } from '@/schemas/instrument'

export const useInstrumentFormChannels = (form: UseFormReturn<InstrumentFormType>, instrumentId?: string) => {
	const { data: channels } = useGetAll<Channel>({
		endpoint: ENDPOINTS.CHANNEL,
		requestParams: {
			instrumentId: Number(instrumentId),
		},
		enabled: !!instrumentId,
	})

	const { setValue, control } = form

	const {
		fields: channelsFields,
		remove,
		append,
	} = useFieldArray({
		control,
		name: 'channels',
	})

	const onUarChange = useCallback(() => {
		channelsFields.map((_, index) => {
			setValue(`channels.${index}.lndbRef`, '')
		})
	}, [channelsFields])

	const onTypeChange = useCallback(
		(type: InstrumentType) => {
			remove()

			INSTRUMENT_READING_VARIABLES[type].map((readingVariable) => {
				const channel = channels?.find((channel) => channel.readingVariable == readingVariable)

				append({
					readingVariable,
					lndbRef: channel?.lndbRef ?? '',
					id: channel?.id,
				})
			})
		},
		[remove, append]
	)

	return {
		onUarChange,
		onTypeChange,
		channelsFields,
	}
}
