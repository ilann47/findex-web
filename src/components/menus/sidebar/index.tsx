import { Location } from '@carbon/icons-react'
import { 
  Policy as PolicyIcon, 
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon 
} from '@mui/icons-material'
import { Stack, ToggleButton } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'

import LanguageSwitcher from './language-switcher'
import { SidebarContainer, StyledToggleButtonGroup } from './style'
import { Text } from '../../ui/text'
import Br from '../../../assets/images/flags/br.svg?react'
import Py from '../../../assets/images/flags/py.svg?react'
import { isSidebarCollapsedAtom } from '../../../contexts/atoms/sidebar'
import { isAdminModeAtom } from '../../../contexts/atoms/admin-mode'
import { useLocale } from '../../../hooks/locale'
import { useDirectorAccess } from '../../../hooks/useDirectorAccess'
import { ProtectedComponent } from '../../../layouts/protected/component'
import { theme } from '../../../theme'

export const Sidebar = () => {
	const isCollapsed = useAtomValue(isSidebarCollapsedAtom)
	const isAdminMode = useAtomValue(isAdminModeAtom)
	const { locale } = useLocale()
	const { hasDirectorAccess } = useDirectorAccess()

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleChange = (_e: unknown, value: string) => {
		if (value === null) {
			navigate(`/${pathname.split('/')[1]}`)
		} else {
			navigate(`/${value}`)
		}
	}

	// Função para renderizar abas de usuário normal
	const renderUserTabs = () => (
		<>
			{/* Viagens */}
			<ProtectedComponent role={['TRAVEL_LIST', 'TRAVEL_CREATE']}>
				<ToggleButton value='travels'>
					<Location />
					{!isCollapsed && 'Viagens'}
				</ToggleButton>
			</ProtectedComponent>
		</>
	)

	// Função para renderizar abas de administrador
	const renderAdminTabs = () => (
		<>
			{/* Políticas de Despesas */}
			<ToggleButton value='expense-policies'>
				<PolicyIcon />
				{!isCollapsed && 'Políticas'}
			</ToggleButton>

			{/* Usuários */}
			<ToggleButton value='users'>
				<PeopleIcon />
				{!isCollapsed && 'Usuários'}
			</ToggleButton>

			{/* Relatórios */}
			<ToggleButton value='reports'>
				<AnalyticsIcon />
				{!isCollapsed && 'Relatórios'}
			</ToggleButton>

			{/* Configurações */}
			<ToggleButton value='settings'>
				<SettingsIcon />
				{!isCollapsed && 'Configurações'}
			</ToggleButton>
		</>
	)

	return (
		<SidebarContainer iscollapsed={isCollapsed ? 1 : 0}>
			<StyledToggleButtonGroup
				orientation='vertical'
				exclusive
				fullWidth
				value={pathname.split('/')[1]}
				onChange={handleChange}
			>
				{/* Mostrar abas baseadas no modo atual */}
				{hasDirectorAccess && isAdminMode ? renderAdminTabs() : renderUserTabs()}
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
