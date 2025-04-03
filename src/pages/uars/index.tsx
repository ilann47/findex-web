import ListSection from './list'
import MapSection from './map'
import UarFormType from '@/components/uar/form'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ProtectedComponent } from '@/layouts/protected/component'
import { ViewLayout } from '@/layouts/view'
import { Section } from '@/layouts/view/sections'

type SectionName = 'map' | 'list'

const UarsPage = () => {
	const formatMessage = useFormatMessage()
	const modalRef = useModal()

	const SECTIONS: Section<SectionName>[] = [
		{
			label: 'map',
			value: 'map',
		},
		{
			label: 'list',
			value: 'list',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>{formatMessage('uar.acronym')}</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<ProtectedComponent role='UAR_CREATE'>
						<RegisterButton onClick={openModal(modalRef)} />
					</ProtectedComponent>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				<UarFormType modalRef={modalRef} />
				{section == 'list' && <ListSection />}
				{section == 'map' && <MapSection />}
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default UarsPage
