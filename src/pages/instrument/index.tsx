import { useParams } from 'react-router-dom'

import AcquisitionSection from './acquisition'
import AlarmsSection from './alarms'
import EngineeringDataSection from './engineering-data'
import OverviewSection from './overview'
import ReadingsSection from './readings'
import CalibrationForm from '@/components/calibration/form'
import InstrumentForm from '@/components/instrument/form'
import NotFoundNavigation from '@/components/navigation/not-found'
import DropdownButton from '@/components/ui/inputs/dropdown-button'
import { EnableButton } from '@/components/ui/inputs/enable-button'
import { openModal, useModal } from '@/components/ui/modal'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAuth } from '@/hooks/auth'
import { useGetBy } from '@/hooks/get/get-by'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'
import { Instrument } from '@/schemas/instrument'

type SectionName = 'overview' | 'acquisition' | 'readings' | 'engineering-values' | 'alarms'

const InstrumentPage = () => {
	const formatMessage = useFormatMessage()

	const { instrumentId } = useParams()
	const { userHasRole } = useAuth()

	const calibrationFormRef = useModal()
	const instrumentFormRef = useModal()

	const { data: instrument, isLoading } = useGetBy<Instrument>({
		endpoint: ENDPOINTS.INSTRUMENT,
		id: instrumentId ?? '',
	})

	const SECTIONS: Section<SectionName>[] = [
		{
			label: 'overview',
			value: 'overview',
		},
		{
			label: 'instrument.acquisition',
			value: 'acquisition',
		},
		{
			label: 'instrument.readings.title.plural',
			value: 'readings',
		},
		{
			label: 'instrument.engineering-value.title.plural',
			value: 'engineering-values',
		},
		{
			label: 'alarm.title.plural',
			value: 'alarms',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	if (!instrument && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title
					goBack
					isLoading={isLoading}
				>{`${formatMessage('instrument.title.singular')} ${instrument?.name}`}</ViewLayout.Header.Title>

				<ViewLayout.Header.RightElements isLoading={isLoading}>
					{instrument && (
						<EnableButton
							entity='instrument'
							enabled={instrument.enabled}
							id={instrument.id}
							disabled={!userHasRole('INSTRUMENT_CHANGE_STATUS')}
						/>
					)}

					<DropdownButton
						options={[
							{
								label: 'form.edit',
								onClick: openModal(instrumentFormRef),
								role: 'INSTRUMENT_UPDATE',
							},
							{
								label: {
									id: 'form.register-item',
									values: {
										item: formatMessage('instrument.calibration.title.singular'),
									},
								},
								onClick: openModal(calibrationFormRef),
								role: 'INSTRUMENT_CALIBRATION_CREATE',
							},
						]}
					/>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section == 'overview' && <OverviewSection instrument={instrument} isLoading={isLoading} />}

				{section == 'acquisition' && <AcquisitionSection instrument={instrument} isLoading={isLoading} />}

				{section == 'readings' && <ReadingsSection instrument={instrument} />}

				{section == 'engineering-values' && (
					<EngineeringDataSection instrument={instrument} isLoading={isLoading} />
				)}

				{section == 'alarms' && <AlarmsSection instrument={instrument} isLoading={isLoading} />}

				<InstrumentForm instrumentId={instrumentId} modalRef={instrumentFormRef} />
			</ViewLayout.Content>

			{instrument && (
				<CalibrationForm
					modalRef={calibrationFormRef}
					instrumentType={instrument.type}
					instrumentId={instrument.id}
					type='create'
				/>
			)}
		</ViewLayout.Root>
	)
}

export default InstrumentPage
