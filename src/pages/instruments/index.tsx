import ListSection from './list'
import MapSection from './map'
import InstrumentFormType from '@/components/instrument/form'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ProtectedComponent } from '@/layouts/protected/component'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'

type SectionName = 'map' | 'list'

const InstrumentsPage = () => {
	const formatMessage = useFormatMessage()
	const modalRef = useModal()

	const SECTIONS: Section<SectionName>[] = [
		{
			label: 'list',
			value: 'list',
		},
		{
			label: 'map',
			value: 'map',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('instrument.title.plural')}</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<ProtectedComponent role='INSTRUMENT_CREATE'>
						<RegisterButton onClick={openModal(modalRef)} />
					</ProtectedComponent>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section === 'map' && <MapSection />}
				{section === 'list' && <ListSection />}
				<InstrumentFormType modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default InstrumentsPage
