import { ChartArea, IbmCloudAppId, Settings, Temperature, WarningSquare } from '@carbon/icons-react'
import { Stack, ToggleButton } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useIntl } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'

import LanguageSwitcher from './language-switcher'
import { SidebarContainer, StyledToggleButtonGroup } from './style'
import { Text } from '../../ui/text'
import ElectricalPanel from '@/assets/images/electrical-panel.svg?react'
import Br from '@/assets/images/flags/br.svg?react'
import Py from '@/assets/images/flags/py.svg?react'
import { isSidebarCollapsedAtom } from '@/contexts/atoms/sidebar'
import { useLocale } from '@/hooks/locale'
import { ProtectedComponent } from '@/layouts/protected/component'
import { theme } from '@/theme'

export const Sidebar = () => {
	const isCollapsed = useAtomValue(isSidebarCollapsedAtom)
	const { locale } = useLocale()

	const { formatMessage } = useIntl()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleChange = (_e: unknown, value: string) => {
		if (value === null) {
			navigate(`/${pathname.split('/')[1]}`)
		} else {
			navigate(`/${value}`)
		}
	}

	return (
		<SidebarContainer iscollapsed={isCollapsed ? 1 : 0}>
			<StyledToggleButtonGroup
				orientation='vertical'
				exclusive
				fullWidth
				value={pathname.split('/')[1]}
				onChange={handleChange}
			>
				<ProtectedComponent role='UAR_LIST'>
					<ToggleButton value='uars'>
						<ElectricalPanel />
						{!isCollapsed && formatMessage({ id: 'uar.acronym' })}
					</ToggleButton>
				</ProtectedComponent>

				<ProtectedComponent role='ALARM_LIST'>
					<ToggleButton value='alarms'>
						<WarningSquare />
						{!isCollapsed && formatMessage({ id: 'alarm.title.plural' })}
					</ToggleButton>
				</ProtectedComponent>

				<ProtectedComponent role='INSTRUMENT_LIST'>
					<ToggleButton value='instruments'>
						<Temperature />
						{!isCollapsed && formatMessage({ id: 'instrument.title.plural' })}
					</ToggleButton>
				</ProtectedComponent>

				<ToggleButton value='analysis'>
					<ChartArea />
					{!isCollapsed && formatMessage({ id: 'analysis.title.singular' })}
				</ToggleButton>

				<ProtectedComponent role={['AUTH_GROUP_LIST', 'AUTH_USER_LIST']}>
					<ToggleButton value='auth'>
						<IbmCloudAppId />
						{!isCollapsed && formatMessage({ id: 'auth.title' })}
					</ToggleButton>
				</ProtectedComponent>

				<ProtectedComponent role='ALARM_COLOR_UPDATE'>
					<ToggleButton value='settings'>
						<Settings />
						{!isCollapsed && formatMessage({ id: 'setting.title.plural' })}
					</ToggleButton>
				</ProtectedComponent>
			</StyledToggleButtonGroup>

			<Stack alignItems='center' gap={8} mb={3} width='100%'>
				{isCollapsed ? locale == 'pt' ? <Br /> : <Py /> : <LanguageSwitcher />}

				<Text
					color={theme.palette.juicy.neutral[40]}
					fontSize={11}
					message={{
						id: isCollapsed ? 'v' : 'version',
						values: { version: import.meta.env.VITE_APP_VERSION },
					}}
				/>
			</Stack>
		</SidebarContainer>
	)
}
