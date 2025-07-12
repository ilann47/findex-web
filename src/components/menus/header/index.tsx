import { useCallback } from 'react'

import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import { Stack } from '@mui/material'
import { useAtom } from 'jotai'

import { HeaderContainer } from './style'
import Logotype from '@/assets/images/payTravel_logotype.svg?react'
import { IconButton } from '@/components/ui/inputs/icon-button'
import { UserAvatar } from '@/components/user/avatar'
import { isSidebarCollapsedAtom } from '@/contexts/atoms/sidebar'
import { theme } from '@/theme'

export const Header = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useAtom(isSidebarCollapsedAtom)

	const handleSidebarCollapse = useCallback(() => {
		setIsSidebarCollapsed((prev) => !prev)
	}, [])

	return (
		<HeaderContainer>
			<Stack direction='row' gap={2} alignItems='center'>
				<IconButton onClick={handleSidebarCollapse} tooltip='collapse-sidebar'>
					{isSidebarCollapsed ? (
						<ChevronRight color='#FFF' size={theme.spacing(3)} />
					) : (
						<ChevronLeft color='#FFF' size={theme.spacing(3)} />
					)}
				</IconButton>


				<Logotype width={200} />
			</Stack>

			<UserAvatar />
		</HeaderContainer>
	)
}
