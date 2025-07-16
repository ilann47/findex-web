import { OverflowMenuVertical } from '@carbon/icons-react'
import { ButtonProps, MenuItem, MenuList } from '@mui/material'

import Popover, { openPopover, usePopover } from '../../popover'
import { Button } from '../button'
import { IconButton } from '../icon-button'
import { useAuth } from '@/hooks/auth'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { RoleName } from '@/schemas/auth'
import { Message } from '@/types/i18n'

interface Options {
	label: Message
	onClick: () => void
	role?: RoleName
}

interface DropdownButtonProps extends Omit<ButtonProps, 'size' | 'title'> {
	title?: Message
	options: Options[]
	size?: 'small' | 'medium'
}

const DropdownButton = ({ options, title, size = 'medium', ...other }: DropdownButtonProps) => {
	const popoverRef = usePopover()
	const formatMessage = useFormatMessage()
	const { userHasGroup } = useAuth()

	if (options.length === 0 || !options.some((opt) => (opt.role ? userHasGroup(opt.role) : true))) return null

	return (
		<>
			{title && (
				<Button
					onClick={(e) => openPopover(popoverRef)(e.currentTarget)}
					label={title}
					size={size}
					{...other}
				/>
			)}
			{!title && (
				<IconButton onClick={(e) => openPopover(popoverRef)(e.currentTarget)} tooltip='options' {...other}>
					<OverflowMenuVertical size={size == 'small' ? 24 : 32} />
				</IconButton>
			)}
			<Popover ref={popoverRef} sx={{ padding: 0 }}>
				<MenuList>
					{options?.map(
						(option) =>
							(option.role ? userHasGroup(option.role) : true) && (
								<MenuItem onClick={option.onClick} key={option.label.toString()} sx={{ minWidth: 120 }}>
									{formatMessage(option.label)}
								</MenuItem>
							)
					)}
				</MenuList>
			</Popover>
		</>
	)
}

export default DropdownButton
