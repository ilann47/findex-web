import { Logout } from '@carbon/icons-react'
import { Avatar, Typography } from '@mui/material'

import { Button } from '@/components/ui/inputs/button'
import { IconButton } from '@/components/ui/inputs/icon-button'
import { openModal, useModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal/confirmation'
import Popover, { openPopover, usePopover } from '@/components/ui/popover'
import { useAuth } from '@/hooks/auth'
import { getNameInitials } from '@/utils/get-name-initials'

export const UserAvatar = () => {
	const { user, logout } = useAuth()

	const popoverRef = usePopover()
	const confirmationModalRef = useModal()

	if (!user) return null

	return (
		<>
			<IconButton onClick={(e) => openPopover(popoverRef)(e.currentTarget)} tooltip='auth.user.title.singular'>
				<Avatar variant='rounded'>{getNameInitials(user.email)}</Avatar>
			</IconButton>

			<Popover ref={popoverRef} gap={0.5}>
				<Typography variant='h1' fontSize={18}>
					{user.email }
				</Typography>
				<Typography color={(theme) => theme.palette.juicy.neutral[70]}>{user?.email}</Typography>

				<Button
					variant='text'
					label='auth.exit'
					startIcon={<Logout />}
					onClick={openModal(confirmationModalRef)}
				/>
			</Popover>

			<ConfirmationModal
				modalRef={confirmationModalRef}
				title='auth.exit-confirmation.title'
				description='auth.exit-confirmation.description'
				onConfirm={logout}
			/>
		</>
	)
}
