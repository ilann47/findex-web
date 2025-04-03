import { useParams } from 'react-router-dom'

import AlarmsSection from './alarms'
import InstrumentsSection from './instruments'
import OverviewSection from './overview'
import NotFoundNavigation from '@/components/navigation/not-found'
import UarForm from '@/components/uar/form'
import DropdownButton from '@/components/ui/inputs/dropdown-button'
import { EnableButton } from '@/components/ui/inputs/enable-button'
import { openModal, useModal } from '@/components/ui/modal'
import { ENDPOINTS } from '@/constants/endpoints'
import { useAuth } from '@/hooks/auth'
import { useGetBy } from '@/hooks/get/get-by'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'
import { Uar } from '@/schemas/uar'

type SectionName = 'overview' | 'instruments' | 'alarms'

const UarPage = () => {
	const { uarId } = useParams()
	const modalRef = useModal()
	const { userHasRole } = useAuth()

	const { data: uar, isLoading } = useGetBy<Uar>({ endpoint: ENDPOINTS.UAR, id: uarId ?? '' })

	const SECTIONS: Section<SectionName>[] = [
		{
			label: 'overview',
			value: 'overview',
		},
		{
			label: 'instrument.title.plural',
			value: 'instruments',
		},
		{
			label: 'alarm.title.plural',
			value: 'alarms',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	if (!uar && !isLoading) return <NotFoundNavigation />

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack isLoading={isLoading}>
					{uar?.name ?? ''}
				</ViewLayout.Header.Title>

				<ViewLayout.Header.RightElements isLoading={isLoading}>
					{uar && (
						<EnableButton
							entity='uar'
							enabled={uar.enabled}
							id={uar.id}
							disabled={!userHasRole('UAR_CHANGE_STATUS')}
						/>
					)}
					<DropdownButton
						options={[
							{
								label: 'form.edit',
								onClick: openModal(modalRef),
								role: 'UAR_UPDATE',
							},
						]}
					/>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section == 'overview' && <OverviewSection uar={uar} isLoading={isLoading} />}
				{section == 'instruments' && <InstrumentsSection uar={uar} isLoading={isLoading} />}
				{section == 'alarms' && <AlarmsSection uar={uar} isLoading={isLoading} />}

				<UarForm uarId={uarId} modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default UarPage
