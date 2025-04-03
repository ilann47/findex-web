import { RefObject, useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, TextField } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { InfoWarning } from '@/components/ui/feedback/warning/info'
import Checkbox from '@/components/ui/inputs/checkbox'
import ControlledCheckbox from '@/components/ui/inputs/checkbox/controlled'
import { CheckboxLoading } from '@/components/ui/inputs/checkbox/loading'
import Select from '@/components/ui/inputs/select'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { SelectedFiltersSummary } from '@/components/ui/selected-filters-summary'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAnalysisInstruments } from '@/hooks/analysis/instruments'
import { useGetAll } from '@/hooks/get'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { AddInstrumentsForm as AddInstrumentsFormType, addInstrumentsFormSchema } from '@/schemas/analysis'
import { Instrument } from '@/schemas/instrument'
import { Uar } from '@/schemas/uar'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
}

export const AddInstrumentsForm = ({ modalRef }: Props) => {
	const [name, setName] = useState('')
	const [uarId, setUarId] = useState(-1)

	const formatMessage = useFormatMessage()
	const { addInstruments, instrumentsMetaData } = useAnalysisInstruments()

	const { data: uars } = useGetAll<Uar>({ endpoint: ENDPOINTS.UAR })
	const { data: instruments, isLoading: isLoadingInstruments } = useGetAll<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
	})

	const filteredInstruments = useMemo(() => {
		const alreadyAddedInstruments = new Set(instrumentsMetaData.map(({ instrumentId }) => Number(instrumentId)))

		return instruments.filter(
			(inst) =>
				!alreadyAddedInstruments.has(inst.id) &&
				inst.name.toLowerCase().includes(name.toLowerCase()) &&
				(uarId === -1 || inst.uar.id === uarId)
		)
	}, [name, uarId, instruments, instrumentsMetaData])

	const form = useForm<AddInstrumentsFormType>({
		resolver: zodResolver(addInstrumentsFormSchema),
		values: getSchemaDefaults(addInstrumentsFormSchema),
	})

	const onSubmit = useCallback(
		async ({ instrumentsIds }: AddInstrumentsFormType) => {
			closeModal(modalRef)()

			addInstruments(
				instrumentsIds.map((instrumentId) => {
					const instrument = instruments.find((instrument) => instrument.id === instrumentId) as Instrument

					return {
						id: instrument.id,
						type: instrument.type,
					}
				})
			)
		},
		[addInstruments, instruments]
	)

	const selectedInstrumentsIds = form.watch('instrumentsIds')
	const allChecked = useMemo(() => {
		return filteredInstruments.every((filteredInst) => selectedInstrumentsIds.includes(filteredInst.id))
	}, [filteredInstruments, selectedInstrumentsIds])

	const handleSelectAll = useCallback(() => {
		if (allChecked) {
			form.setValue(
				'instrumentsIds',
				selectedInstrumentsIds.filter(
					(instrumentId) =>
						!filteredInstruments.some((filteredInstrument) => filteredInstrument.id == instrumentId)
				)
			)
		} else {
			form.setValue('instrumentsIds', [
				...new Set([...selectedInstrumentsIds, ...filteredInstruments.map((inst) => inst.id)]),
			])
		}
	}, [filteredInstruments, allChecked])

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title='analysis.add-instruments'
				primaryButtonLabel='add'
				width='616px'
				disabled={selectedInstrumentsIds.length === 0}
				onClose={() => {
					setName('')
					setUarId(-1)
				}}
			>
				<Stack gap={3}>
					<Stack direction='row' gap={3}>
						<TextField
							label={formatMessage('name')}
							fullWidth
							value={name ?? ''}
							onChange={(event) => setName(event.target.value)}
							size='small'
						/>

						<Select
							label={formatMessage('uar.acronym')}
							items={[
								{
									label: formatMessage('all.fem'),
									value: -1,
								},
								...uars.map((uar) => ({
									label: uar.name,
									value: uar.id.toString(),
								})),
							]}
							value={uarId ?? -1}
							onChange={(event) => setUarId(Number(event.target.value))}
							size='small'
						/>
					</Stack>

					<Stack gap={1}>
						{filteredInstruments.length > 0 && (
							<Checkbox
								label={formatMessage('table.filtering.select-all')}
								checked={allChecked}
								onChange={handleSelectAll}
							/>
						)}

						<Stack height='24vh' gap={2} sx={{ overflow: 'auto' }}>
							{filteredInstruments.map((instrument) => (
								<ControlledCheckbox
									key={instrument.id + uuidv4()}
									label={instrument.name}
									description={instrument.uar.name}
									control={form.control}
									name={'instrumentsIds'}
									value={instrument.id}
								/>
							))}

							{isLoadingInstruments &&
								Array.from({ length: 5 }).map((_, index) => <CheckboxLoading key={index} />)}

							{!isLoadingInstruments && filteredInstruments.length === 0 && (
								<InfoWarning descriptionId='no-data' p={4} />
							)}
						</Stack>
					</Stack>

					<SelectedFiltersSummary
						selected={selectedInstrumentsIds.map(
							(instrumentId) =>
								instruments.find((instrument) => instrument.id === instrumentId)?.name ?? ''
						)}
					/>
				</Stack>
			</ModalForm>
		</FormProvider>
	)
}
