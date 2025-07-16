import { StackProps } from '@mui/material'
import { useAtomValue } from 'jotai'

import { ViewContainer } from './styles'
import { isSidebarCollapsedAtom } from '@/contexts/atoms/sidebar'

export const ViewLayoutRoot = (props: StackProps) => {
	const isSidebarCollapsed = useAtomValue(isSidebarCollapsedAtom)

	return <ViewContainer iscollapsed={isSidebarCollapsed ? 1 : 0} {...props} />
}
