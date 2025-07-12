import { Location } from '@carbon/icons-react'
import { Stack, ToggleButton } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'

import LanguageSwitcher from './language-switcher'
import { SidebarContainer, StyledToggleButtonGroup } from './style'
import { Text } from '../../ui/text'
import Br from '@/assets/images/flags/br.svg?react'
import Py from '@/assets/images/flags/py.svg?react'
import { isSidebarCollapsedAtom } from '@/contexts/atoms/sidebar'
import { useLocale } from '@/hooks/locale'
import { ProtectedComponent } from '@/layouts/protected/component'
import { theme } from '@/theme'

export const Sidebar = () => {
	const isCollapsed = useAtomValue(isSidebarCollapsedAtom)
	const { locale } = useLocale()

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

				{/* Viagens */}
				<ProtectedComponent role={['TRAVEL_LIST', 'TRAVEL_CREATE']}>
					<ToggleButton value='travels'>
						<Location />
						{!isCollapsed && 'Viagens'}
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
