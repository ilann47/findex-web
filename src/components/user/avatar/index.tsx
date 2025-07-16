import { Logout } from '@carbon/icons-react'
import { Avatar, Typography, Chip, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../ui/inputs/button'
import { IconButton } from '../../ui/inputs/icon-button'
import { openModal, useModal } from '../../ui/modal'
import { ConfirmationModal } from '../../ui/modal/confirmation'
import Popover, { openPopover, usePopover } from '../../ui/popover'
import { useAuth } from '../../../hooks/auth'
import { useUserRoles } from '../../../hooks/useUserRoles'
import { getNameInitials } from '../../../utils/get-name-initials'

export const UserAvatar = () => {
	const { user, logout } = useAuth()
	const { getUserRolesSummary, hasDirectorAccess } = useUserRoles()

	const popoverRef = usePopover()
	const confirmationModalRef = useModal()

	const navigate = useNavigate()

	if (!user) return null

	const userEmail = user.username || 'Usuário'
	const displayName = user.name  || userEmail
	const roleSummary = getUserRolesSummary()

	return (
		<>
			<IconButton onClick={(e) => openPopover(popoverRef)(e.currentTarget)} tooltip='auth.user.title.singular'>
				<Avatar variant='rounded'>{getNameInitials(displayName)}</Avatar>
			</IconButton>

			<Popover ref={popoverRef} gap={0.5}>
				<Typography variant='h1' fontSize={18}>
					{displayName}
				</Typography>
				<Typography color={(theme) => theme.palette.juicy.neutral[70]}>{userEmail}</Typography>
				
				{/* Resumo da Role Principal */}
				<Box sx={{ mt: 1, mb: 1 }}>
					<Chip 
						label={roleSummary}
						color={hasDirectorAccess ? 'secondary' : 'primary'}
						size="small"
						variant="outlined"
					/>
				</Box>

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
				onConfirm={() => {
					logout()
					navigate('/login')
				}}
			/>
		</>
	)
}
